import styles from './App.module.scss';
import { CurrencyConverterHeader } from './components/CurrencyConverterHeader/CurrencyConverterHeader';
import { CurrencyInput } from '../src/components/CurrencyInput/CurrencyInput';
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart';
import { CurrencyPairsList } from './components/CurrencyPairsList/CurrencyPairsList';
import { CurrencyInformation } from './components/CurrencyInformation/CurrencyInformation';
import { currenciesMocks } from '../src/mocks/currenciesMocks';
import { currencyPairs } from '../src/data/currencyPairs';
import { chartPeriods } from './data/chartPeriods';
import { useState } from 'react';
import { useCurrencyConverter } from './hooks/useCurrencyConverter';
import { CurrenciesSwapButton } from './components/CurrenciesSwapButton/CurrenciesSwapButton';

export const App = () => {
  const [fromCurrencyCode, setFromCurrencyCode] = useState('CAD');
  const [toCurrencyCode, setToCurrencyCode] = useState('PLN');
  const [amountFromCurrency, setAmountFromCurrency] = useState('1');

  const { fromCurrency, toCurrency, amountToCurrency } = useCurrencyConverter(
    fromCurrencyCode,
    toCurrencyCode,
    amountFromCurrency
  );

  const swapCurrencies = () => {
    setFromCurrencyCode(toCurrencyCode);
    setToCurrencyCode(fromCurrencyCode);
  };

  return (
    <main className={styles.page}>
      <div className={styles['top-half']}>
        <div className={styles['left-column']}>
          <CurrencyConverterHeader
            fromAmountCurrency={amountFromCurrency}
            fromCurrency={fromCurrency}
            toAmountCurrency={amountToCurrency}
            toCurrency={toCurrency}
            date="Fri, 05 Apr 2026"
            time="10:35 UTC"
          />

          <CurrencyInput
            amountLabel="Сколько отдаёте"
            currencyLabel="Валюта, которую отдаёте"
            amount={amountFromCurrency}
            currencyCode={fromCurrencyCode}
            currencies={currenciesMocks}
            onAmountChange={setAmountFromCurrency}
            onCurrencyChange={setFromCurrencyCode}
            selectedCurrency={toCurrencyCode}
          />

          <CurrenciesSwapButton onClick={swapCurrencies} />

          <CurrencyInput
            amountLabel="Сколько получаете"
            currencyLabel="Валюта, которую получаете"
            amount={amountToCurrency}
            currencyCode={toCurrencyCode}
            currencies={currenciesMocks}
            onCurrencyChange={setToCurrencyCode}
            readonly={true}
            selectedCurrency={fromCurrencyCode}
          />

          <FilterButtons />
        </div>
        <div className={styles['right-column']}>
          <CurrencyChart periods={chartPeriods} currentPeriod={4} />
        </div>
      </div>

      <div className={styles['bottom-half']}>
        <CurrencyPairsList pairs={currencyPairs} activePair={`${fromCurrencyCode}/${toCurrencyCode}`} />

        <CurrencyInformation fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>
    </main>
  );
};
