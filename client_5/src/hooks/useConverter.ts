import { useState, useEffect, useMemo } from 'react';
import { useDataReducer } from './useDataReducer';
import { getCurrencies, getPriceHistory } from '../api/api';
import { mapCurrencyDtoToCurrency } from '../mappers/currencyMapper';
import { mapPriceChangeDtoToPriceChange } from '../mappers/priceChangeMapper';
import type { Currency } from '../types/currency';
import type { PriceChanges } from '../types/priceChanges';

const DEFAULT_PERIOD = 3;
const UPDATE_INTERVAL_MS = 10000;
const MS_IN_MINITE = 60 * 1000;

export function useConverter() {
  const { state: currenciesState, dispatch: currenciesDispatch } = useDataReducer<Currency[]>();
  const { state: pricesState, dispatch: pricesDispatch } = useDataReducer<PriceChanges[]>();

  const [fromCurrencyCode, setFromCode] = useState<string>('');
  const [toCurrencyCode, setToCode] = useState<string>('');
  const [amountFromCurrency, setAmountFrom] = useState('1');

  const fromCurrency = currenciesState.data?.find((c) => c.code === fromCurrencyCode);
  const toCurrency = currenciesState.data?.find((c) => c.code === toCurrencyCode);

  const latestPrice = pricesState.data?.[pricesState.data.length - 1];
  const updatedAt = latestPrice?.dateTime ?? new Date().toISOString();
  const rate = latestPrice?.price ?? 0;

  const [period, setPeriod] = useState(DEFAULT_PERIOD);
  const LAST_TIME = period * MS_IN_MINITE;

  const amountToCurrency = useMemo(() => {
    if (rate && amountFromCurrency && !isNaN(Number(amountFromCurrency))) {
      return (Number(amountFromCurrency) * rate).toFixed(2);
    }
    return '0';
  }, [amountFromCurrency, rate]);

  const handlePeriodChange = (newPeriod: number) => {
    setPeriod(newPeriod);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const load = async () => {
      currenciesDispatch({ type: 'LOADING' });
      try {
        //await new Promise((slow) => setTimeout(slow, 3000)); //добавил для быстрого теста загрузки
        const list = await getCurrencies();
        const currencies = list.map(mapCurrencyDtoToCurrency);

        currenciesDispatch({ type: 'SUCCESS', payload: currencies });

        if (currencies.length >= 2 && !fromCurrencyCode && !toCurrencyCode) {
          setFromCode(currencies[0].code);
          setToCode(currencies[1].code);
        }
      } catch (e) {
        currenciesDispatch({
          type: 'ERROR',
          payload: (e as Error).message || 'Ошибка загрузки валют'
        });
      }
    };
    load();
    return () => abortController.abort();
  }, [currenciesDispatch, fromCurrencyCode, toCurrencyCode]);

  useEffect(() => {
    if (!fromCurrencyCode || !toCurrencyCode) return;

    let currentController: AbortController | null = null;

    const load = async () => {
      if (currentController) {
        currentController.abort();
      }

      const controller = new AbortController();
      currentController = controller;

      pricesDispatch({ type: 'LOADING' });
      try {
        //throw new Error('Test error'); //тоже быстрый тест ошибки toast
        const fromDateTime = new Date(Date.now() - LAST_TIME).toISOString();
        const dtoList = await getPriceHistory(
          fromCurrencyCode,
          toCurrencyCode,
          fromDateTime,
          undefined,
          controller.signal
        );

        if (controller.signal.aborted) return;

        const priceChanges = dtoList.map(mapPriceChangeDtoToPriceChange);

        pricesDispatch({ type: 'SUCCESS', payload: priceChanges });
      } catch (e) {
        if (controller.signal.aborted) return;
        pricesDispatch({
          type: 'ERROR',
          payload: (e as Error).message || 'Ошибка загрузки курсов'
        });
      }
    };

    load();

    const interval = setInterval(load, UPDATE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      if (currentController) {
        currentController.abort();
      }
    };
  }, [fromCurrencyCode, toCurrencyCode, pricesDispatch, period]);

  const setFromCurrencyCode = (code: string) => {
    setFromCode(code);

    if (code === toCurrencyCode) {
      const alt = currenciesState.data?.find((c) => c.code !== code);
      if (alt) {
        setToCode(alt.code);
      }
    }
  };

  const setToCurrencyCode = (code: string) => {
    setToCode(code);
    if (code === fromCurrencyCode) {
      const alt = currenciesState.data?.find((c) => c.code !== code);
      if (alt) {
        setFromCode(alt.code);
      }
    }
  };

  const setValidAmountChange = (value: string) => setAmountFrom(value);

  const swapCurrencies = () => {
    if (!fromCurrencyCode || !toCurrencyCode) return;
    setFromCode(toCurrencyCode);
    setToCode(fromCurrencyCode);
    setAmountFrom(amountToCurrency);
  };

  return {
    fromCurrencyCode,
    toCurrencyCode,
    amountFromCurrency,
    amountToCurrency,
    fromCurrency,
    toCurrency,
    currencies: currenciesState.data || [],
    setFromCurrencyCode,
    setToCurrencyCode,
    setValidAmountChange,
    swapCurrencies,
    updatedAt,
    pricesLoading: pricesState.loading,
    currenciesLoading: currenciesState.loading,
    pricesError: pricesState.error,
    currenciesError: currenciesState.error,
    period,
    handlePeriodChange,
    pricesState
  };
}
