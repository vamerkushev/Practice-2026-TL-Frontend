import { render, screen } from '@testing-library/react';

import { CurrencyPairsList } from './CurrencyPairsList';
import { currencyPairs } from '../../data/currencyPairs';

test('отображает валютные пары', () => {
  render(<CurrencyPairsList pairs={currencyPairs} activePair="PLN/JPY" />);

  currencyPairs.forEach(({ fromCurrency, toCurrency }) => {
    expect(screen.getByText(`${fromCurrency}/${toCurrency}`)).toBeInTheDocument();
  });
});
