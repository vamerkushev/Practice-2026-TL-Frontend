import { render, screen } from '@testing-library/react';

import { CurrencyChart } from './CurrencyChart';
import { chartPeriods } from '../../data/chartPeriods';
import { priceChangesMocks } from '../../mocks/priceChangesMocks';

const mockData = Object.values(priceChangesMocks.CAD);

test('отображает кнопки всех периодов', () => {
  render(
    <CurrencyChart
      period={3}
      data={[]}
      isLoading={false}
      error={null}
      onPeriodChange={() => {}}
    />);

  chartPeriods.forEach((period) => {
    expect(screen.getByText(`${period} MIN`)).toBeInTheDocument();
  });
});


test('отображает график', () => {
  render(
    <CurrencyChart
      period={3}
      data={mockData}
      isLoading={false}
      error={null}
      onPeriodChange={() => {}}
    />
  );

  const svgElement = document.querySelector('svg');
  expect(svgElement).toBeInTheDocument();
});

test('показывается нужное сообщение при отсутствии данных', () => {
  render(
    <CurrencyChart
      period={3}
      data={[]}
      isLoading={false}
      error={null}
      onPeriodChange={() => {}}
    />
  );

  expect(screen.getByText('No data for period!')).toBeInTheDocument();
});