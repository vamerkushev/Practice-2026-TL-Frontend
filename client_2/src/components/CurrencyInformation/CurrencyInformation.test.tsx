import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencyInformation } from '../CurrencyInformation/CurrencyInformation';
import { getCurrency } from '../../tools/getCurrency';

const currencyInformationProps = {
  fromCurrency: getCurrency('PLN')!,
  toCurrency: getCurrency('JPY')!
};

const renderCurrencyInformation = () => {
  return render(<CurrencyInformation {...currencyInformationProps}></CurrencyInformation>);
};

test('отображает заголовки для переданных валют', async () => {
  const user = userEvent.setup();
  renderCurrencyInformation();
  await user.click(screen.getByTestId('about-button'));
  expect(screen.getByText('Polish zloty - PLN - zł')).toBeInTheDocument();
  expect(screen.getByText('Japanese yen - JPY - ¥')).toBeInTheDocument();
});

test('отображает соответствующие описания для переданных валют', async () => {
  const user = userEvent.setup();
  renderCurrencyInformation();
  await user.click(screen.getByTestId('about-button'));
  expect(screen.getByText(getCurrency('PLN')!.description)).toBeInTheDocument();
  expect(screen.getByText(getCurrency('JPY')!.description)).toBeInTheDocument();
});

test('отображает кнопку с соответсвтующей парой валют', () => {
  renderCurrencyInformation();
  expect(screen.getByText('PLN/JPY: about')).toBeInTheDocument();
});
