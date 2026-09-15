import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { App } from './App';
import { currenciesMocks } from './mocks/currenciesMocks';
import userEvent from '@testing-library/user-event';

test('рендер селектов и полей с мок-данными', () => {
  render(<App />);

  expect(screen.getByText('1 Polish zloty is')).toBeInTheDocument();
  expect(screen.getByText('36.05 Japanese yen')).toBeInTheDocument();

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;
  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;

  expect(fromAmountInput).toHaveValue('1');
  expect(toAmountInput).toHaveValue('36.05');
  expect(fromSelect).toHaveValue('PLN');
  expect(toSelect).toHaveValue('JPY');

  const expectedCodes = currenciesMocks.map((currency) => currency.code);
  expect(Array.from(fromSelect.querySelectorAll('option')).map((option) => option.value)).toEqual(expectedCodes);
  expect(Array.from(toSelect.querySelectorAll('option')).map((option) => option.value)).toEqual(expectedCodes);
});

test('пересчёт конвертации при изменении суммы в меньшую сторону', async () => {
  const user = userEvent.setup();
  render(<App />);

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(toAmountInput.value).toEqual('36.05');
  await user.clear(fromAmountInput);
  await user.type(fromAmountInput, '0');
  expect(toAmountInput.value).toEqual('0.00');
});

test('пересчёт конвертации при изменении суммы в большую сторону', async () => {
  const user = userEvent.setup();
  render(<App />);

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(toAmountInput.value).toEqual('36.05');
  await user.clear(fromAmountInput);
  await user.type(fromAmountInput, '10');
  expect(toAmountInput.value).toEqual('360.50');
});

test('пересчёт конвертации при изменении пары, меняем валюту, которую отдаем', async () => {
  const user = userEvent.setup();
  render(<App />);

  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(fromSelect.value).toEqual('PLN');
  await user.selectOptions(fromSelect, 'ZAR');
  expect(toSelect.value).toEqual('JPY');
  expect(toAmountInput.value).toEqual('7.69');
});

test('пересчёт конвертации при изменении пары, меняем валюту, которую получаем', async () => {
  const user = userEvent.setup();
  render(<App />);

  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(fromSelect.value).toEqual('PLN');
  await user.selectOptions(toSelect, 'ZAR');
  expect(toSelect.value).toEqual('ZAR');
  expect(toAmountInput.value).toEqual('4.69');
});

test('пересчёт конвертации при изменении пары, меняем их местами через кнопку swap', async () => {
  const user = userEvent.setup();
  render(<App />);

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;
  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;

  expect(fromAmountInput).toHaveValue('1');
  expect(toAmountInput).toHaveValue('36.05');
  expect(fromSelect).toHaveValue('PLN');
  expect(toSelect).toHaveValue('JPY');

  const swapButton = screen.getByAltText('swap-currencies');
  expect(swapButton).toBeInTheDocument();
  await user.click(swapButton);

  expect(fromSelect).toHaveValue('JPY');
  expect(toSelect).toHaveValue('PLN');
  expect(fromAmountInput).toHaveValue('1');
  expect(toAmountInput).toHaveValue('0.03');
});

test('запрет на одинаковые валюты в паре: в первом селекте нельзя выбрать вторую валюту, а во втором селекте нельзя выбрать первую', () => {
  render(<App />);

  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;
  expect(fromSelect).toHaveValue('PLN');
  expect(toSelect).toHaveValue('JPY');

  const fromOptions = fromSelect.querySelectorAll('option');
  const jpyOption = Array.from(fromOptions).find((opt) => opt.value === 'JPY');
  expect(jpyOption).toBeDisabled();

  const toOptions = toSelect.querySelectorAll('option');
  const plnOption = Array.from(toOptions).find((opt) => opt.value === 'PLN');
  expect(plnOption).toBeDisabled();
});

test('reset состояния описания по key при смене пары', async () => {
  const user = userEvent.setup();
  render(<App />);

  expect(screen.queryByText('Polish zloty')).not.toBeInTheDocument();
  expect(screen.queryByText('Japanese yen')).not.toBeInTheDocument();

  const aboutButton = screen.getByTestId('about-button');
  await user.click(aboutButton);

  expect(screen.getByText('Polish zloty - PLN - zł')).toBeInTheDocument();
  expect(screen.getByText('Japanese yen - JPY - ¥')).toBeInTheDocument();

  const swapButton = screen.getByAltText('swap-currencies');
  await user.click(swapButton);

  expect(screen.queryByText('Polish zloty - PLN - zł')).not.toBeInTheDocument();
  expect(screen.queryByText('Japanese yen - JPY - ¥')).not.toBeInTheDocument();

  expect(screen.getByText('JPY/PLN: about')).toBeInTheDocument();
});
