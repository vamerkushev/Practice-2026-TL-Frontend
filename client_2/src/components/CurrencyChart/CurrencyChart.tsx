import styles from './CurrencyChart.module.scss';
import chart from '../../images/Graf.png';
import { Button } from '../Button/Button';

type CurrencyChartProps = {
  periods: number[];
  currentPeriod: number;
};

export const CurrencyChart = ({ periods, currentPeriod }: CurrencyChartProps) => {
  return (
    <div className={styles.container}>
      <div className={styles[`buttons-list`]}>
        {periods.map((period) => (
          <Button key={period} kind={period === currentPeriod ? 'active' : 'default'} className={styles.button}>
            {period} MIN
          </Button>
        ))}
      </div>

      <img className={styles.chart} src={chart} alt="chart"></img>
    </div>
  );
};
