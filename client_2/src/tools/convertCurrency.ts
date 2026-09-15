import { priceChangesMocks } from '../mocks/priceChangesMocks';
import { getCurrency } from './getCurrency';
import type { Currency } from '../types/currency';

export const convertCurrency = (
  fromCurrencyCode: string,
  toCurrencyCode: string,
  amountFromCurrency: string
):
  | {
      fromCurrency: Currency;
      toCurrency: Currency;
      amountToCurrency: string;
      updatedAt: string;
    }
  | undefined => {
  const pricesFrom = priceChangesMocks[fromCurrencyCode];
  if (!pricesFrom) {
    return undefined;
  }

  const priceChange = pricesFrom[toCurrencyCode];
  if (!priceChange) {
    return undefined;
  }

  const amountToCurrency = (Number(amountFromCurrency) * priceChange.price).toFixed(2);

  const fromCurrency = getCurrency(fromCurrencyCode);
  const toCurrency = getCurrency(toCurrencyCode);
  if (!fromCurrency || !toCurrency) {
    return undefined;
  }

  const updatedAt = priceChange.dateTime;

  return { fromCurrency, toCurrency, amountToCurrency, updatedAt };
};
