import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { CurrencyPairsList } from './CurrencyPairsList';
import { currencyPairs } from '../../data/currencyPairs';
import type { CurrencyPair } from '../../types/currencyPair';

test('отображает валютные пары', () => {
  render(<CurrencyPairsList pairs={currencyPairs} activePair="PLN/JPY" onSelect={vi.fn()} />);

  currencyPairs.forEach(({ fromCurrency, toCurrency }) => {
    expect(screen.getByText(`${fromCurrency}/${toCurrency}`)).toBeInTheDocument();
  });
});

test('выбор сохраненной пары обновляет текущие селекты', () => {
  const mockOnSelect = vi.fn();

  const testPairs: CurrencyPair[] = [
    { fromCurrency: 'PLN', toCurrency: 'JPY' },
    { fromCurrency: 'USD', toCurrency: 'EUR' },
    { fromCurrency: 'CAD', toCurrency: 'PLN' }
  ];

  render(<CurrencyPairsList pairs={testPairs} activePair="PLN/JPY" onSelect={mockOnSelect} />);

  fireEvent.click(screen.getByText('USD/EUR'));

  expect(mockOnSelect).toHaveBeenCalledWith('USD', 'EUR');
});

test('подсвечивает активную пару стилем active', () => {
  render(<CurrencyPairsList pairs={currencyPairs} activePair="PLN/JPY" onSelect={vi.fn()} />);

  const activeButton = screen.getByText('PLN/JPY');
  expect(activeButton.className).toContain('active');
});

test('не рендерит ничего при пустом массиве пар', () => {
  const { container } = render(<CurrencyPairsList pairs={[]} activePair="PLN/JPY" onSelect={vi.fn()} />);

  expect(container.firstChild).toBeNull();
});
