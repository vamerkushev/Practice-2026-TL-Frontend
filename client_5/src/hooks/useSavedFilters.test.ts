import { renderHook, act } from '@testing-library/react';
import { expect, beforeEach } from 'vitest';
import { useSavedFilters } from './useSavedFilters';
import { currenciesMocks } from '../mocks/currenciesMocks';

beforeEach(() => {
  window.localStorage.clear();
});

test('инициализация с пустым localStorage возвращает пустой массив', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  expect(result.current.filters).toEqual([]);
});

test('восстановление фильтров из localStorage при инициализации', () => {
  const savedFilters = [
    { fromCurrency: 'PLN', toCurrency: 'JPY' },
    { fromCurrency: 'USD', toCurrency: 'EUR' }
  ];
  window.localStorage.setItem('filters', JSON.stringify(savedFilters));

  const { result } = renderHook(() => useSavedFilters(null));

  expect(result.current.filters).toEqual(savedFilters);
});

test('возврат пустого массива при невалидном JSON в localStorage', () => {
  window.localStorage.setItem('filters', 'invalid-json');

  const { result } = renderHook(() => useSavedFilters(null));

  expect(result.current.filters).toEqual([]);
});

test('добавление текущей валютной пары по нажатию на Save Filter', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  act(() => {
    result.current.addFilter('PLN', 'JPY');
  });

  expect(result.current.filters).toEqual([{ fromCurrency: 'PLN', toCurrency: 'JPY' }]);
});

test('запись сохраненных пар в localStorage', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  act(() => {
    result.current.addFilter('PLN', 'JPY');
  });

  const stored = window.localStorage.getItem('filters');
  expect(stored).toBe(JSON.stringify([{ fromCurrency: 'PLN', toCurrency: 'JPY' }]));
});

test('отображение сохраненных пар в правильном порядке', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  act(() => {
    result.current.addFilter('PLN', 'JPY');
    result.current.addFilter('USD', 'EUR');
  });

  expect(result.current.filters).toEqual([
    { fromCurrency: 'PLN', toCurrency: 'JPY' },
    { fromCurrency: 'USD', toCurrency: 'EUR' }
  ]);
});

test('уникальность валютных пар, дубликаты не добавляются', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  act(() => {
    result.current.addFilter('PLN', 'JPY');
    result.current.addFilter('PLN', 'JPY');
  });

  expect(result.current.filters).toHaveLength(1);
  expect(result.current.filters[0]).toEqual({ fromCurrency: 'PLN', toCurrency: 'JPY' });
});

test('ограничение списка пятью элементами: при добавлении шестой пары удаляется первая, а новая появляется в конце', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  act(() => {
    result.current.addFilter('PLN', 'JPY');
    result.current.addFilter('USD', 'EUR');
    result.current.addFilter('CAD', 'PLN');
    result.current.addFilter('EUR', 'USD');
    result.current.addFilter('JPY', 'CAD');
    result.current.addFilter('PLN', 'USD');
  });

  expect(result.current.filters).toHaveLength(5);
  expect(result.current.filters[0]).toEqual({ fromCurrency: 'USD', toCurrency: 'EUR' });
  expect(result.current.filters[4]).toEqual({ fromCurrency: 'PLN', toCurrency: 'USD' });
});

test('очистка списка и localStorage по нажатию на Clear Filter', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  act(() => {
    result.current.addFilter('PLN', 'JPY');
    result.current.addFilter('USD', 'EUR');
  });

  expect(result.current.filters).toHaveLength(2);

  act(() => {
    result.current.clearFilters();
  });

  expect(result.current.filters).toEqual([]);
  expect(window.localStorage.getItem('filters')).toBeNull();
});

test('очистка пустого списка, ничего не происходит', () => {
  const { result } = renderHook(() => useSavedFilters(null));

  act(() => {
    result.current.clearFilters();
  });

  expect(result.current.filters).toEqual([]);
});

test('валидация, удаление фильтров с невалидными валютами после загрузки API', () => {
  const filtersWithInvalid = [
    { fromCurrency: 'PLN', toCurrency: 'JPY' },
    { fromCurrency: 'INVALID', toCurrency: 'EUR' }
  ];
  window.localStorage.setItem('filters', JSON.stringify(filtersWithInvalid));

  const { result } = renderHook(() => useSavedFilters(currenciesMocks));

  expect(result.current.filters).toEqual([{ fromCurrency: 'PLN', toCurrency: 'JPY' }]);
});
