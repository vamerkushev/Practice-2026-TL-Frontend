import { render, screen, fireEvent } from '@testing-library/react';

import { FilterButtons } from './FilterButtons';

test('отображает кнопки фильтров', () => {
  render(<FilterButtons onSave={vi.fn()} onClear={vi.fn()}></FilterButtons>);

  expect(screen.getByText('+ SAVE FILTER')).toBeInTheDocument();
  expect(screen.getByText('CLEAR FILTERS')).toBeInTheDocument();
});

test('вызов onSave при клике на Save Filter', () => {
  const mockOnSave = vi.fn();

  render(<FilterButtons onSave={mockOnSave} onClear={vi.fn()} />);

  fireEvent.click(screen.getByText('+ SAVE FILTER'));

  expect(mockOnSave).toHaveBeenCalledTimes(1);
});

test('вызов onClear при клике на Clear Filter', () => {
  const mockOnClear = vi.fn();

  render(<FilterButtons onSave={vi.fn()} onClear={mockOnClear} />);

  fireEvent.click(screen.getByText('CLEAR FILTERS'));

  expect(mockOnClear).toHaveBeenCalledTimes(1);
});
