import { priceChangesMocks } from '../mocks/priceChangesMocks';
import { getCurrency } from '../mocks/currenciesMocks';
import type { Currency } from '../types/currency';

export const useCurrencyConverter = (
  fromCurrencyCode: string,
  toCurrencyCode: string,
  amountFromCurrency: string
): {
  fromCurrency: Currency;
  toCurrency: Currency;
  amountToCurrency: string;
} => {
  const courseSelectedPairs = priceChangesMocks[fromCurrencyCode]?.[toCurrencyCode]?.price;
  const amountToCurrency = (Number(amountFromCurrency) * courseSelectedPairs).toFixed(2);

  const fromCurrency = getCurrency(fromCurrencyCode);
  const toCurrency = getCurrency(toCurrencyCode);

  return { fromCurrency, toCurrency, amountToCurrency };
};
