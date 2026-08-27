import type { Currency } from '../types/currency';

export const currencies: Currency[] = [
  {
    code: 'PLN',
    title: 'Polish zloty',
    symbol: 'zł',
    description:
      'This is the official currency and legal tender of Poland. It is subdivided into 100 grosz-y (gr). It is the most traded currency in Central and Eastern Europe and ranks 21st most-traded in the foreign exchange market.'
  },
  {
    code: 'JPY',
    title: 'Japanese yen',
    symbol: '¥',
    description:
      'The yen is the official currency of Japan. It is the third-most traded currency in the foreign exchange market, after the United States dollar and the euro. It is also widely used as a third reserve currency after the US dollar and the euro.'
  },
  { code: 'CAD', title: 'Canadian dollar', symbol: '$', description: 'No description.' },
  { code: 'USD', title: 'United States dollar', symbol: '$', description: 'No description.' },
  { code: 'EUR', title: 'Euro', symbol: '€', description: 'No description.' }
];

export const getCurrency = (code: string): Currency => {
  const currency = currencies.find((c) => c.code === code);
  if (!currency) {
    throw new Error(`Валюта ${code} не найдена!`);
  }
  return currency;
};
