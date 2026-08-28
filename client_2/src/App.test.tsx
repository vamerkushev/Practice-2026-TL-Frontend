import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect } from 'vitest';
import { App } from './App';

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

  expect(fromSelect.querySelectorAll('option').length).toBeGreaterThan(0);
  expect(toSelect.querySelectorAll('option').length).toBeGreaterThan(0);
});

test('пересчёт конвертации при изменении суммы в меньшую сторону', () => {
  render(<App />);

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(toAmountInput.value).toEqual('36.05');
  fireEvent.change(fromAmountInput, { target: { value: '0' } });
  expect(toAmountInput.value).toEqual('0.00');
});

test('пересчёт конвертации при изменении суммы в большую сторону', () => {
  render(<App />);

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(toAmountInput.value).toEqual('36.05');
  fireEvent.change(fromAmountInput, { target: { value: '10' } });
  expect(toAmountInput.value).toEqual('360.50');
});

test('пересчёт конвертации при изменении пары, меняем валюту, которую отдаем', () => {
  render(<App />);

  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(fromSelect.value).toEqual('PLN');
  fireEvent.change(fromSelect, { target: { value: 'ZAR' } });
  expect(toSelect.value).toEqual('JPY');
  expect(toAmountInput.value).toEqual('7.69');
});

test('пересчёт конвертации при изменении пары, меняем валюту, которую получаем', () => {
  render(<App />);

  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(fromSelect.value).toEqual('PLN');
  fireEvent.change(toSelect, { target: { value: 'ZAR' } });
  expect(toSelect.value).toEqual('ZAR');
  expect(toAmountInput.value).toEqual('4.69');
});

test('пересчёт конвертации при изменении пары, меняем их местами через кнопку swap', () => {
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
  fireEvent.click(swapButton);

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

test('reset состояния описания по key при смене пары', () => {
  render(<App />);

  expect(screen.queryByText('Polish zloty')).not.toBeInTheDocument();
  expect(screen.queryByText('Japanese yen')).not.toBeInTheDocument();

  const aboutButton = screen.getByTestId('about-button');
  fireEvent.click(aboutButton);

  expect(screen.getByText('Polish zloty - PLN - zł')).toBeInTheDocument();
  expect(screen.getByText('Japanese yen - JPY - ¥')).toBeInTheDocument();

  const swapButton = screen.getByAltText('swap-currencies');
  fireEvent.click(swapButton);

  expect(screen.queryByText('Polish zloty')).not.toBeInTheDocument();
  expect(screen.queryByText('Japanese yen')).not.toBeInTheDocument();

  expect(screen.getByText('JPY/PLN: about')).toBeInTheDocument();
});