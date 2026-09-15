import { currenciesMocks } from '../mocks/currenciesMocks';
import type { Currency } from '../types/currency';

export const getCurrency = (code: string): Currency | undefined => {
  return currenciesMocks.find((c) => c.code === code);
};
