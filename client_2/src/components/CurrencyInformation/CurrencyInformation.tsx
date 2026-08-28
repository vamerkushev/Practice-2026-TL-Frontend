import styles from './CurrencyInformation.module.scss';
import ArrowTop from '../../images/ArrowTop.png';
import { Button } from '../Button/Button';
import type { Currency } from '../../types/currency';
import { useState } from 'react';

type CurrencyInformationProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export const CurrencyInformation = ({ fromCurrency, toCurrency }: CurrencyInformationProps) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button kind="default" className={styles.button} onClick={() => setIsShown((value) => !value)}>
          <span>
            {fromCurrency.code}/{toCurrency.code}: about{' '}
          </span>
          <img className={`${styles.arrow} ${!isShown && styles[`arrow-closed`]}`} src={ArrowTop} alt="arrow-top"></img>
        </Button>
        <span className={styles.line}></span>
      </div>
      <div className={`${styles.content} ${!isShown && styles[`content-hidden`]}`}>
        <div className={`${styles.block} ${!isShown && styles.none}`}>
          <h2 className={styles.title}>
            {fromCurrency.name} - {fromCurrency.code} - {fromCurrency.symbol}
          </h2>
          <p className={styles.text}>{fromCurrency.description || 'No description!'}</p>
        </div>
        <div className={`${styles.block} ${!isShown && styles.none}`}>
          <h2 className={styles.title}>
            {toCurrency.name} - {toCurrency.code} - {toCurrency.symbol}
          </h2>
          <p className={styles.text}>{toCurrency.description || 'No description!'}</p>
        </div>
      </div>
    </div>
  );
};
