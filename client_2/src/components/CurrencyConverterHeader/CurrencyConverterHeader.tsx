import type { Currency } from '../../types/currency';
import styles from './CurrencyConverterHeader.module.scss';

type CurrencyConverterHeaderProps = {
  fromAmountCurrency: string;
  fromCurrency: Currency;
  toAmountCurrency: string;
  toCurrency: Currency;
  date: string;
  time: string;
};

export const CurrencyConverterHeader = ({
  fromAmountCurrency,
  fromCurrency,
  toAmountCurrency,
  toCurrency,
  date,
  time
}: CurrencyConverterHeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles['from-converter-info']}>
        {fromAmountCurrency} {fromCurrency.name} is
      </p>
      <p className={styles['to-converter-info']}>
        {toAmountCurrency} {toCurrency.name}
      </p>
      <p className={styles.datetime}>
        {date} {time}
      </p>
    </div>
  );
};
