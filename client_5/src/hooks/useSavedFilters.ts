import { useCallback } from 'react';
import { useTypedStorageItem } from './useTypedStorageItem';
import { createTypedStorage } from '../store/typedStorage';
import type { CurrencyPair } from '../types/currencyPair';

const storage = createTypedStorage<{ filters: CurrencyPair[] }>();
const STORAGE_KEY = 'filters';
const MAX_PERIOD = 5;

export function useSavedFilters() {
  const { value, set, remove } = useTypedStorageItem<{ filters: CurrencyPair[] }, 'filters'>(STORAGE_KEY, storage);

  const filters: CurrencyPair[] = value ?? [];

  const addFilter = useCallback(
    (from: string, to: string) => {
      const exists = filters.some((f) => f.fromCurrency === from && f.toCurrency === to);
      if (exists) return;

      const newFilter: CurrencyPair = { fromCurrency: from, toCurrency: to };

      let updatedFilters = [...filters, newFilter];

      if (updatedFilters.length > MAX_PERIOD) {
        updatedFilters = updatedFilters.slice(-MAX_PERIOD);
      }

      set(updatedFilters);
    },
    [filters, set]
  );

  const clearFilters = useCallback(() => remove(), [remove]);

  return {
    filters,
    addFilter,
    clearFilters
  };
}
