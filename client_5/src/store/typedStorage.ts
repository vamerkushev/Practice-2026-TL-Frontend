export type TypedStorageValue = Record<string, unknown>;

export type TypedStorage<S extends TypedStorageValue> = {
  get<K extends Extract<keyof S, string>>(key: K): S[K] | null;
  set<K extends Extract<keyof S, string>>(key: K, value: S[K]): S[K] | null;
  remove(key: Extract<keyof S, string>): void;
  clear(): void;
};

const cache = new Map<string, { raw: string | null; parsed: unknown }>();

export function createTypedStorage<S extends TypedStorageValue>(): TypedStorage<S> {
  const isClient = typeof window !== 'undefined';

  const getStorage = (): Storage | null => {
    if (!isClient) return null;
    return window.localStorage;
  };

  return {
    get<K extends Extract<keyof S, string>>(key: K): S[K] | null {
      const storage = getStorage();
      if (!storage) return null;

      try {
        const raw = storage.getItem(key);

        const cached = cache.get(key);
        if (cached && cached.raw === raw) {
          return cached.parsed as S[K];
        }

        if (!raw) return null;

        const parsed = JSON.parse(raw) as S[K];
        cache.set(key, { raw, parsed });

        return parsed;
      } catch (error) {
        console.warn(`Invalid data for key "${key}":`, error);
        storage.removeItem(key);
        cache.delete(key);
        return null;
      }
    },

    set<K extends Extract<keyof S, string>>(key: K, value: S[K]): S[K] | null {
      const storage = getStorage();
      if (!storage) return null;

      try {
        const raw = JSON.stringify(value);
        storage.setItem(key, raw);

        cache.set(key, { raw, parsed: value });

        if (isClient) {
          window.dispatchEvent(new CustomEvent(`storage-${key}`));
        }

        return value;
      } catch (error) {
        console.error(`Failed to save key "${key}":`, error);
        return null;
      }
    },

    remove(key: Extract<keyof S, string>): void {
      getStorage()?.removeItem(key);
      cache.delete(key);
      if (isClient) {
        window.dispatchEvent(new CustomEvent(`storage-${key}`));
      }
    },

    clear(): void {
      getStorage()?.clear();
      cache.clear();
      if (isClient) {
        window.dispatchEvent(new CustomEvent('clear-storage'));
      }
    }
  };
}
