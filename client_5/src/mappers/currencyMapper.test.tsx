import { test, expect } from 'vitest';
import { mapCurrencyDtoToCurrency } from './currencyMapper';

test('маппер CurrencyDto в Currency', () => {
  const dto = {
    code: 'USD',
    name: 'Dollar',
    description: 'Dollar desctiption',
    symbol: '$'
  };

  const result = mapCurrencyDtoToCurrency(dto);

  expect(result).toEqual({
    code: 'USD',
    name: 'Dollar',
    description: 'Dollar desctiption',
    symbol: '$'
  });
});

test('маппер с пустыми строками', () => {
  const dto = {
    code: '',
    name: '',
    description: '',
    symbol: ''
  };
  const result = mapCurrencyDtoToCurrency(dto);

  expect(result).toEqual({
    code: '',
    name: '',
    description: '',
    symbol: ''
  });
});

test('игнорирование лишних полей DTO', () => {
  const dto = {
    code: 'USD',
    name: 'Dollar',
    description: 'Dollar desctiption',
    symbol: '$',
    smth: 'ignor'
  } as any;

  const result = mapCurrencyDtoToCurrency(dto);

  expect(result).not.toHaveProperty('smth');
  expect(result).toEqual({
    code: 'USD',
    name: 'Dollar',
    description: 'Dollar desctiption',
    symbol: '$'
  });
});
