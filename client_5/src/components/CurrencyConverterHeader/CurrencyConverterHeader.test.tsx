import { render, screen } from '@testing-library/react';
import { getCurrency } from '../../mocks/currenciesMocks';

import { CurrencyConverterHeader } from './CurrencyConverterHeader';

test('отображает заголовок текущей валютной пары', () => {
  render(
    <CurrencyConverterHeader
      fromAmountCurrency="1"
      fromCurrency={getCurrency('PLN')}
      toAmountCurrency="0.99"
      toCurrency={getCurrency('JPY')}
      updatedAt="2026-04-27T09:30:00.000Z"
    />
  );

  expect(screen.getByText('1 Polish zloty is')).toBeInTheDocument();
  expect(screen.getByText('0.99 Japanese yen')).toBeInTheDocument();
  expect(screen.getByText('27 Apr 2026, 09:30:00 UTC')).toBeInTheDocument();
});
