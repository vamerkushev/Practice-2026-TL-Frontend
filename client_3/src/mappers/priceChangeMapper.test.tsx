import { test, expect } from 'vitest';
import { mapPriceChangeDtoToPriceChange } from './priceChangeMapper';

test('маппер PriceChangeDto в PriceChange', () => {
  const dto = {
    purchasedCurrencyCode: 'JPY',
    paymentCurrencyCode: 'CAD',
    price: 0.0094,
    dateTime: '2026-04-27'
  };

  const result = mapPriceChangeDtoToPriceChange(dto);

  expect(result).toEqual({
    purchasedCurrencyCode: 'JPY',
    paymentCurrencyCode: 'CAD',
    price: 0.0094,
    dateTime: '2026-04-27'
  });
});

test('маппер с пустыми строками и нулевой ценой', () => {
  const dto = {
    purchasedCurrencyCode: '',
    paymentCurrencyCode: '',
    price: 0,
    dateTime: ''
  };

  const result = mapPriceChangeDtoToPriceChange(dto);

  expect(result).toEqual({
    purchasedCurrencyCode: '',
    paymentCurrencyCode: '',
    price: 0,
    dateTime: ''
  });
});

test('игнорирование лишних полей DTO', () => {
  const dto = {
    purchasedCurrencyCode: 'JPY',
    paymentCurrencyCode: 'CAD',
    price: 0.0094,
    dateTime: '2026-04-27',
    smth: 'ignor'
  } as any;

  const result = mapPriceChangeDtoToPriceChange(dto);

  expect(result).not.toHaveProperty('smth');
  expect(result).toEqual({
    purchasedCurrencyCode: 'JPY',
    paymentCurrencyCode: 'CAD',
    price: 0.0094,
    dateTime: '2026-04-27'
  });
});
