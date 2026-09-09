import { test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDataReducer } from './useDataReducer';

test('инициализация, все поля null', () => {
  const { result } = renderHook(() => useDataReducer<string[]>());

  expect(result.current.state).toEqual({ data: null, loading: false, error: null });
});

test('диспатч LOADING - loading true', () => {
  const { result } = renderHook(() => useDataReducer<string[]>());

  act(() => result.current.dispatch({ type: 'LOADING' }));

  expect(result.current.state).toEqual({ data: null, loading: true, error: null });
});

test('диспатч SUCCESS - запись data', () => {
  const { result } = renderHook(() => useDataReducer<string[]>());

  act(() => result.current.dispatch({ type: 'SUCCESS', payload: ['USD', 'RUB'] }));

  expect(result.current.state).toEqual({ data: ['USD', 'RUB'], loading: false, error: null });
});

test('диспатч ERROR - заипсь error', () => {
  const { result } = renderHook(() => useDataReducer<string[]>());

  act(() => result.current.dispatch({ type: 'ERROR', payload: 'Error' }));

  expect(result.current.state).toEqual({ data: null, loading: false, error: 'Error' });
});

test('последовательность вызовов LOADING, SUCCESS, LOADING - сохранение data', () => {
  const { result } = renderHook(() => useDataReducer<string[]>());

  act(() => result.current.dispatch({ type: 'LOADING' }));
  act(() => result.current.dispatch({ type: 'SUCCESS', payload: ['RUB'] }));

  expect(result.current.state.data).toEqual(['RUB']);
  act(() => result.current.dispatch({ type: 'LOADING' }));

  expect(result.current.state.data).toEqual(['RUB']);
  expect(result.current.state.loading).toBe(true);
  expect(result.current.state.error).toBeNull();
});

test('последовательность вызовов LOADING, ERROR, LOADING - сбрасывает error', () => {
  const { result } = renderHook(() => useDataReducer<string[]>());

  act(() => result.current.dispatch({ type: 'LOADING' }));
  act(() => result.current.dispatch({ type: 'ERROR', payload: 'Error' }));

  expect(result.current.state.error).toBe('Error');
  act(() => result.current.dispatch({ type: 'LOADING' }));

  expect(result.current.state.error).toBeNull();
  expect(result.current.state.loading).toBe(true);
  expect(result.current.state.data).toBeNull();
});
