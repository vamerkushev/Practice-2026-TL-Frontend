import type { CurrencyDto } from './dto/currencyDto';
import type { PriceChangeDto } from './dto/priceChangeDto';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5081',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getCurrencies = async (): Promise<CurrencyDto[]> => {
  const response = await apiClient.get<CurrencyDto[]>('/Currency');
  return response.data;
};

export const getPriceHistory = async (
  paymentCurrency: string,
  purchasedCurrency: string,
  fromDateTime: string,
  toDateTime?: string,
  signal?: AbortSignal
): Promise<PriceChangeDto[]> => {
  const params: Record<string, string> = {
    paymentCurrency,
    purchasedCurrency,
    fromDateTime
  };
  if (toDateTime) {
    params.toDateTime = toDateTime;
  }
  const response = await apiClient.get<PriceChangeDto[]>('/prices', { params, signal });
  return response.data;
};
