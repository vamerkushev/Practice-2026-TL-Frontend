import styles from './App.module.scss';
import { CurrencyConverterHeader } from './components/CurrencyConverterHeader/CurrencyConverterHeader';
import { CurrencyInput } from '../src/components/CurrencyInput/CurrencyInput';
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart';
import { CurrencyPairsList } from './components/CurrencyPairsList/CurrencyPairsList';
import { CurrencyInformation } from './components/CurrencyInformation/CurrencyInformation';
import { currencyPairs } from '../src/data/currencyPairs';
import { chartPeriods } from './data/chartPeriods';
import { CurrenciesSwapButton } from './components/CurrenciesSwapButton/CurrenciesSwapButton';
import { useConverter } from './hooks/useConverter';

export const App = () => {
  const {
    fromCurrencyCode,
    toCurrencyCode,
    amountFromCurrency,
    amountToCurrency,
    fromCurrency,
    toCurrency,
    currencies,
    setFromCurrencyCode,
    setToCurrencyCode,
    setValidAmountChange,
    swapCurrencies,
    updatedAt,
    pricesLoading
  } = useConverter();

  if (!fromCurrency || !toCurrency) {
    return (
      <div className={styles.page}>
        <p>Загрузка данных</p>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles['top-half']}>
        <div className={styles['left-column']}>
          <CurrencyConverterHeader
            fromAmountCurrency={amountFromCurrency}
            fromCurrency={fromCurrency}
            toAmountCurrency={amountToCurrency}
            toCurrency={toCurrency}
            updatedAt={updatedAt}
          />

          <CurrencyInput
            amountLabel="Сколько отдаёте"
            currencyLabel="Валюта, которую отдаёте"
            amount={amountFromCurrency}
            currencyCode={fromCurrencyCode}
            currencies={currencies}
            onAmountChange={setValidAmountChange}
            onCurrencyChange={setFromCurrencyCode}
            selectedCurrency={toCurrencyCode}
          />

          <CurrenciesSwapButton onClick={swapCurrencies} disabled={pricesLoading} />

          <CurrencyInput
            amountLabel="Сколько получаете"
            currencyLabel="Валюта, которую получаете"
            amount={amountToCurrency}
            currencyCode={toCurrencyCode}
            currencies={currencies}
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

        <CurrencyInformation
          key={`${fromCurrencyCode}-${toCurrencyCode}`}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </div>
    </main>
  );
};
