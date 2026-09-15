import { render, screen } from '@testing-library/react';

import { CurrencyPairsList } from './CurrencyPairsList';
import { currencyPairsMocks } from '../../mocks/currencyPairsMocks';

test('отображает валютные пары', () => {
  render(<CurrencyPairsList pairs={currencyPairsMocks} activePair="PLN/JPY" />);

  currencyPairsMocks.forEach(({ fromCurrency, toCurrency }) => {
    expect(screen.getByText(`${fromCurrency}/${toCurrency}`)).toBeInTheDocument();
  });
});
