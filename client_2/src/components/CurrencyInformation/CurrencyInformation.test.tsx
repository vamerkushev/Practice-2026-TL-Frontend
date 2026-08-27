import { render, screen } from '@testing-library/react';

import { CurrencyInformation } from '../CurrencyInformation/CurrencyInformation';
import { getCurrency } from '../../data/currencies';

const currencyInformationProps = {
  fromCurrency: getCurrency('PLN'),
  toCurrency: getCurrency('JPY')
};

const renderCurrencyInformation = () => {
  return render(<CurrencyInformation {...currencyInformationProps}></CurrencyInformation>);
};

test('отображает заголовки для переданных валют', () => {
  renderCurrencyInformation();
  expect(screen.getByText('Polish zloty - PLN - zł')).toBeInTheDocument();
  expect(screen.getByText('Japanese yen - JPY - ¥')).toBeInTheDocument();
});

test('отображает соответствующие описания для переданных валют', () => {
  renderCurrencyInformation();
  expect(screen.getByText(getCurrency('PLN').description)).toBeInTheDocument();
  expect(screen.getByText(getCurrency('JPY').description)).toBeInTheDocument();
});

test('отображает кнопку с соответсвтующей парой валют', () => {
  renderCurrencyInformation();
  expect(screen.getByText('PLN/JPY: about')).toBeInTheDocument();
});

test('отображает отсутствие описания при передаче неизвестной валюты', () => {
  render(<CurrencyInformation fromCurrency={getCurrency('PLN')} toCurrency={getCurrency('CAD')}></CurrencyInformation>);

  expect(screen.getByText(getCurrency('PLN').description)).toBeInTheDocument();
  expect(screen.getByText('No description.')).toBeInTheDocument();
});
