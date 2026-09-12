import { useCallback, useEffect } from 'react';
import { useTypedStorageItem } from './useTypedStorageItem';
import { createTypedStorage } from '../store/typedStorage';
import type { CurrencyPair } from '../types/currencyPair';
import type { Currency } from '../types/currency';

const storage = createTypedStorage<{ filters: CurrencyPair[] }>();
const STORAGE_KEY = 'filters';
const MAX_FILTERS = 5;

export function useSavedFilters(currencies: Currency[] | null) {
  const { value, set, remove } = useTypedStorageItem<{ filters: CurrencyPair[] }, 'filters'>(STORAGE_KEY, storage);

  const filters: CurrencyPair[] = value ?? [];

  const addFilter = useCallback(
    (from: string, to: string) => {
      set((currentFilters) => {
        const current = currentFilters ?? [];
        const exists = current.some((f) => f.fromCurrency === from && f.toCurrency === to);
        if (exists) return current;

        const newFilter: CurrencyPair = { fromCurrency: from, toCurrency: to };

        const updatedFilters = [...current, newFilter];

        if (updatedFilters.length > MAX_FILTERS) {
          return updatedFilters.slice(-MAX_FILTERS);
        }

        return updatedFilters;
      });
    },
    [set]
  );

  const clearFilters = useCallback(() => remove(), [remove]);

  useEffect(() => {
    if (!currencies || currencies.length === 0) return;

    const validCodes = new Set(currencies.map((c) => c.code));
    const currentFilters = value ?? [];

    const validFilters = currentFilters.filter(
      (filter) => validCodes.has(filter.fromCurrency) && validCodes.has(filter.toCurrency)
    );

    if (validFilters.length !== currentFilters.length) {
      set(validFilters);
    }
  }, [currencies, value, set]);

  return {
    filters,
    addFilter,
    clearFilters
  };
}
