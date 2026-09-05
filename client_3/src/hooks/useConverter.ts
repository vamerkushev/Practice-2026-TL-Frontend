import { useState, useEffect } from 'react';
import { useDataReducer } from './useDataReducer';
import { getCurrencies, getPriceHistory } from '../api/api';
import { mapCurrencyDtoToCurrency } from '../mappers/currencyMapper';
import { mapPriceChangeDtoToPriceChange } from '../mappers/priceChangeMapper';
import type { Currency } from '../types/currency';
import type { PriceChanges } from '../types/priceChanges';

export function useConverter() {
  const { state: currenciesState, dispatch: currenciesDispatch } = useDataReducer<Currency[]>();
  const { state: pricesState, dispatch: pricesDispatch } = useDataReducer<PriceChanges[]>();

  const [fromCurrencyCode, setFromCode] = useState<string>('');
  const [toCurrencyCode, setToCode] = useState<string>('');
  const [amountFromCurrency, setAmountFrom] = useState('1');
  const [amountToCurrency, setAmountTo] = useState('');

  const fromCurrency = currenciesState.data?.find((c) => c.code === fromCurrencyCode);
  const toCurrency = currenciesState.data?.find((c) => c.code === toCurrencyCode);

  const latestPrice = pricesState.data?.[pricesState.data.length - 1];
  const updatedAt = latestPrice?.dateTime ?? new Date().toISOString();

  const LAST_TIME = 30000;

  useEffect(() => {
    const load = async () => {
      currenciesDispatch({ type: 'LOADING' });
      try {
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
  }, []);

  useEffect(() => {
    if (!fromCurrencyCode || !toCurrencyCode) return;

    const load = async () => {
      pricesDispatch({ type: 'LOADING' });
      try {
        const fromDateTime = new Date(Date.now() - LAST_TIME).toISOString();
        const dtoList = await getPriceHistory(fromCurrencyCode, toCurrencyCode, fromDateTime);
        const priceChanges = dtoList.map(mapPriceChangeDtoToPriceChange);

        pricesDispatch({ type: 'SUCCESS', payload: priceChanges });
      } catch (e) {
        pricesDispatch({
          type: 'ERROR',
          payload: (e as Error).message || 'Ошибка загрузки курсов'
        });
      }
    };
    load();
  }, [fromCurrencyCode, toCurrencyCode]);

  useEffect(() => {
    const latest = pricesState.data?.[pricesState.data.length - 1];
    const rate = latest?.price ?? 0;

    if (rate && amountFromCurrency && !isNaN(Number(amountFromCurrency))) {
      setAmountTo((Number(amountFromCurrency) * rate).toFixed(2));
    } else {
      setAmountTo('0');
    }
  }, [amountFromCurrency, pricesState.data]);

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
    pricesLoading: pricesState.loading
  };
}
