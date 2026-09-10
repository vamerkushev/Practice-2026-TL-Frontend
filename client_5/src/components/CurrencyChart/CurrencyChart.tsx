import styles from './CurrencyChart.module.scss';
import { Button } from '../Button/Button';
import { chartPeriods } from '../../data/chartPeriods';
import type { PriceChanges } from '../../types/priceChanges';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const periods = chartPeriods;

type CurrencyChartProps = {
  period: number;
  data: PriceChanges[];
  isLoading: boolean;
  error: string | null;
  onPeriodChange: (period: number) => void;
};

export const CurrencyChart = ({ period, data, isLoading, error, onPeriodChange }: CurrencyChartProps) => {
  const formatDateTime = (iso: string) => {
    const dateTime = new Date(iso);
    return dateTime.toLocaleTimeString('ru-RU');
  };

  const renderContent = () => {
    if (isLoading && data.length === 0) {
      return <div className={styles.message}>Loading chart...</div>;
    }
    if (error && data.length === 0) {
      return <div className={`${styles.message} ${styles.error}`}>{error}</div>;
    }
    if (data.length === 0) {
      return <div className={styles.message}>No data for period!</div>;
    }

    return (
      <LineChart width={500} height={350} data={data}>
        <Tooltip
          labelFormatter={(label) => formatDateTime(String(label))}
          formatter={(value) => [Number(value), 'Price']}
        />
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="dateTime" tickFormatter={formatDateTime} />
        <YAxis dataKey="price" />
        <Line type="linear" dataKey="price" />
      </LineChart>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles[`buttons-list`]}>
        {periods.map((p) => (
          <Button
            key={p}
            kind={p === period ? 'active' : 'default'}
            className={styles.button}
            onClick={() => onPeriodChange(p)}
          >
            {p} MIN
          </Button>
        ))}
      </div>

      <div className={styles.chart}>{renderContent()}</div>
    </div>
  );
};
