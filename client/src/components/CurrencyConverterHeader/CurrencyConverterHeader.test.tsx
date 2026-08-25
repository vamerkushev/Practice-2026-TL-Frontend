import { render, screen } from '@testing-library/react';
import { getCurrency } from '../../data/currencies';

import { CurrencyConverterHeader } from './CurrencyConverterHeader';

test('отображает заголовок текущей валютной пары', () => {
  render(
    <CurrencyConverterHeader
      fromAmountCurrency="1"
      fromCurrency={getCurrency('PLN')}
      toAmountCurrency="0.99"
      toCurrency={getCurrency('JPY')}
      date="Fri, 05 Apr 2026"
      time="10:35 UTC"
    />
  );

  expect(screen.getByText('1 Polish zloty is')).toBeInTheDocument();
  expect(screen.getByText('0.99 Japanese yen')).toBeInTheDocument();
  expect(screen.getByText('Fri, 05 Apr 2026 10:35 UTC')).toBeInTheDocument();
});
