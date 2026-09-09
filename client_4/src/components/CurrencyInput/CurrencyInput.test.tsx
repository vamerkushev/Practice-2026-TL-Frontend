import { render, screen } from '@testing-library/react';

import { currenciesMocks } from '../../mocks/currenciesMocks';
import { CurrencyInput } from '../CurrencyInput/CurrencyInput';

test('показывает переданную сумму', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currenciesMocks}
    />
  );

  expect(screen.getByLabelText('Сколько отдаёте')).toHaveValue('1');
});

test('показывает выбранную валюту', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currenciesMocks}
    />
  );

  expect(screen.getByLabelText('Валюта, которую отдаёте')).toHaveValue('PLN');
});

test('показывает в списке все переданные валюты', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currenciesMocks}
    />
  );

  const options = screen.getAllByRole('option');

  expect(options.map((option) => option.textContent)).toEqual(currenciesMocks.map((currency) => currency.code));
});

test('ничего не зашито внутрь: с другими props показывает другое', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько получаете"
      currencyLabel="Валюта, которую получаете"
      amount="0.99"
      currencyCode="JPY"
      currencies={currenciesMocks}
    />
  );

  expect(screen.getByLabelText('Сколько получаете')).toHaveValue('0.99');
  expect(screen.getByLabelText('Валюта, которую получаете')).toHaveValue('JPY');
});
