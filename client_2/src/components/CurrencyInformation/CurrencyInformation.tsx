import styles from './CurrencyInformation.module.scss';
import ArrowTop from '../../images/ArrowTop.png';
import { Button } from '../Button/Button';
import type { Currency } from '../../types/currency';

type CurrencyInformationProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export const CurrencyInformation = ({ fromCurrency, toCurrency }: CurrencyInformationProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button type="default" className={styles.button}>
          <span>
            {fromCurrency.code}/{toCurrency.code}: about{' '}
          </span>
          <img className={styles.arrow} src={ArrowTop} alt="arrow-top"></img>
        </Button>
        <span className={styles.line}></span>
      </div>
      <div className={styles.block}>
        <h2 className={styles.title}>
          {fromCurrency.title} - {fromCurrency.code} - {fromCurrency.symbol}
        </h2>
        <p className={styles.text}>{fromCurrency.description}</p>
      </div>
      <div className={styles.block}>
        <h2 className={styles.title}>
          {toCurrency.title} - {toCurrency.code} - {toCurrency.symbol}
        </h2>
        <p className={styles.text}>{toCurrency.description}</p>
      </div>
    </div>
  );
};
