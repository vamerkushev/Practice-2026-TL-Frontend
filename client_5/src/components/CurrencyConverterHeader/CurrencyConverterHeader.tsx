import type { Currency } from '../../types/currency';
import styles from './CurrencyConverterHeader.module.scss';

type CurrencyConverterHeaderProps = {
  fromAmountCurrency: string;
  fromCurrency: Currency;
  toAmountCurrency: string;
  toCurrency: Currency;
  updatedAt: string;
};

const parseDate = (value: string) => {
  if (!value) {
    return 'The date is missing!';
  }

  const date = new Date(value);

  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'long',
    timeZone: 'UTC'
  });
};

export const CurrencyConverterHeader = ({
  fromAmountCurrency,
  fromCurrency,
  toAmountCurrency,
  toCurrency,
  updatedAt
}: CurrencyConverterHeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles['from-converter-info']}>
        {fromAmountCurrency} {fromCurrency.name} is
      </p>
      <p className={styles['to-converter-info']}>
        {toAmountCurrency} {toCurrency.name}
      </p>
      <p className={styles.datetime}>{parseDate(updatedAt)}</p>
    </div>
  );
};
