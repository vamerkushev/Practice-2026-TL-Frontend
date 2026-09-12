import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { test, expect, beforeEach, vi } from 'vitest';
import { App } from './App';
import { getCurrencies, getPriceHistory } from '../src/api/api';
import { currenciesMocks } from '../src/mocks/currenciesMocks';
import { priceChangesMocks } from '../src/mocks/priceChangesMocks';

vi.mock('../src/api/api', () => ({
  getCurrencies: vi.fn(),
  getPriceHistory: vi.fn()
}));

const mockedGetCurrencies = vi.mocked(getCurrencies);
const mockedGetPriceHistory = vi.mocked(getPriceHistory);

beforeEach(() => {
  window.localStorage.clear();
  vi.clearAllMocks();
  mockedGetCurrencies.mockResolvedValue(currenciesMocks);
  mockedGetPriceHistory.mockImplementation((paymentCurrency: string, purchasedCurrency: string) => {
    const change = (priceChangesMocks as any)[paymentCurrency]?.[purchasedCurrency];
    return Promise.resolve(change ? [change] : []);
  });
});

test('рендер селектов и полей с мок-данными', async () => {
  render(<App />);

  expect(await screen.findByText('1 Polish zloty is')).toBeInTheDocument();
  expect(await screen.findByText('36.05 Japanese yen')).toBeInTheDocument();

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

test('пересчёт конвертации при изменении суммы в меньшую сторону', async () => {
  render(<App />);

  expect(await screen.findByText('36.05 Japanese yen')).toBeInTheDocument();

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(toAmountInput.value).toEqual('36.05');
  fireEvent.change(fromAmountInput, { target: { value: '0' } });
  expect(toAmountInput.value).toEqual('0.00');
});

test('пересчёт конвертации при изменении суммы в большую сторону', async () => {
  render(<App />);

  expect(await screen.findByText('36.05 Japanese yen')).toBeInTheDocument();

  const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
  const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

  expect(toAmountInput.value).toEqual('36.05');
  fireEvent.change(fromAmountInput, { target: { value: '10' } });
  expect(toAmountInput.value).toEqual('360.50');
});

test('пересчёт конвертации при изменении пары, меняем валюту, которую отдаем', async () => {
  render(<App />);

  expect(await screen.findByText('36.05 Japanese yen')).toBeInTheDocument();

  const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;

  expect(fromSelect.value).toEqual('PLN');
  fireEvent.change(fromSelect, { target: { value: 'ZAR' } });

  await waitFor(() => {
    const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;
    const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;
    expect(toSelect.value).toEqual('JPY');
    expect(toAmountInput.value).toEqual('7.69');
  });
});

test('пересчёт конвертации при изменении пары, меняем валюту, которую получаем', async () => {
  render(<App />);

  expect(await screen.findByText('36.05 Japanese yen')).toBeInTheDocument();

  const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;

  expect(toSelect.value).toEqual('JPY');
  fireEvent.change(toSelect, { target: { value: 'ZAR' } });

  await waitFor(() => {
    const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;
    const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;

    expect(toSelect.value).toEqual('ZAR');
    expect(toAmountInput.value).toEqual('4.69');
  });
});

test('пересчёт конвертации при изменении пары, меняем их местами через кнопку swap', async () => {
  render(<App />);

  expect(await screen.findByText('36.05 Japanese yen')).toBeInTheDocument();

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

  await waitFor(() => {
    const fromAmountInput = screen.getByLabelText('Сколько отдаёте') as HTMLInputElement;
    const toAmountInput = screen.getByLabelText('Сколько получаете') as HTMLInputElement;
    const fromSelect = screen.getByLabelText('Валюта, которую отдаёте') as HTMLSelectElement;
    const toSelect = screen.getByLabelText('Валюта, которую получаете') as HTMLSelectElement;

    expect(fromSelect).toHaveValue('JPY');
    expect(toSelect).toHaveValue('PLN');
    expect(fromAmountInput).toHaveValue('36.05');
    expect(toAmountInput).toHaveValue('1.00');
  });
});

test('запрет на одинаковые валюты в паре: в первом селекте нельзя выбрать вторую валюту, а во втором селекте нельзя выбрать первую', async () => {
  render(<App />);

  expect(await screen.findByText('36.05 Japanese yen')).toBeInTheDocument();

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
  render(<App />);

  expect(await screen.findByText('PLN/JPY: about')).toBeInTheDocument();

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

  await waitFor(() => {
    expect(screen.getByText('JPY/PLN: about')).toBeInTheDocument();
  });
});

test('отображение LOADING при загрузке', async () => {
  mockedGetCurrencies.mockImplementation(() => new Promise(() => {}));

  render(<App />);

  expect(await screen.findByText('LOADING')).toBeInTheDocument();
});

test('отображение ServerError при ошибке загрузки валют', async () => {
  mockedGetCurrencies.mockRejectedValue(new Error('Server Error'));

  render(<App />);

  expect(await screen.findByText('Не удалось загрузить данные! Проверьте соединение с сервером!')).toBeInTheDocument();
});

test('отображение Toast при ошибке загрузки курсов', async () => {
  mockedGetCurrencies.mockResolvedValue(currenciesMocks);
  mockedGetPriceHistory.mockRejectedValue(new Error('Error'));

  render(<App />);

  expect(await screen.findByText('Ошибка загрузки курсов: Error')).toBeInTheDocument();
});
