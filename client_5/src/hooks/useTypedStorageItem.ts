import { useCallback, useMemo } from 'react';
import { useSyncExternalStore } from 'react';
import type { TypedStorage, TypedStorageValue } from '../store/typedStorage';

export function useTypedStorageItem<S extends TypedStorageValue, K extends Extract<keyof S, string>>(
  key: K,
  storage: TypedStorage<S>
) {
  const isClient = typeof window !== 'undefined';
  const customEventName = `storage-${key}`;

  const subscribe = useCallback(
    (callback: () => void) => {
      if (!isClient) return () => undefined;

      window.addEventListener(customEventName, callback);
      window.addEventListener('clear-storage', callback);

      return () => {
        window.removeEventListener(customEventName, callback);
        window.removeEventListener('clear-storage', callback);
      };
    },
    [customEventName, isClient]
  );

  const getSnapshot = useCallback(() => storage.get(key) ?? null, [key, storage]);

  const value = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const set = useCallback((val: S[K]) => storage.set(key, val), [key, storage]);

  const remove = useCallback(() => storage.remove(key), [key, storage]);

  return useMemo(() => ({ value, set, remove }), [value, set, remove]);
}
