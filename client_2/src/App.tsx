import styles from './App.module.scss';
import { CurrencyConverterHeader } from './components/CurrencyConverterHeader/CurrencyConverterHeader';
import { CurrencyInput } from './components/CurrencyInput/CurrencyInput';
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart';
import { CurrencyPairsList } from './components/CurrencyPairsList/CurrencyPairsList';
import { CurrencyInformation } from './components/CurrencyInformation/CurrencyInformation';
import { currenciesMocks } from './mocks/currenciesMocks';
import { currencyPairsMocks } from './mocks/currencyPairsMocks';
import { chartPeriods } from './data/chartPeriods';
import { useState } from 'react';
import { convertCurrency } from './tools/convertCurrency';
import { CurrenciesSwapButton } from './components/CurrenciesSwapButton/CurrenciesSwapButton';

export const App = () => {
  const [fromCurrencyCode, setFromCurrencyCode] = useState('PLN');
  const [toCurrencyCode, setToCurrencyCode] = useState('JPY');
  const [amountFromCurrency, setAmountFromCurrency] = useState('1');

  const result = convertCurrency(fromCurrencyCode, toCurrencyCode, amountFromCurrency);
  if (!result) {
    return (
      <main className={styles.page}>
        <p>
          Не удалось загрузить данные для пары {fromCurrencyCode}/{toCurrencyCode}!
        </p>
      </main>
    );
  }
  const { fromCurrency, toCurrency, amountToCurrency, updatedAt } = result;

  const swapCurrencies = () => {
    setFromCurrencyCode(toCurrencyCode);
    setToCurrencyCode(fromCurrencyCode);
  };

  const handleAmountChange = (value: string) => {
    if (value === '') {
      setAmountFromCurrency(value);
      return;
    }
    const num = Number(value);
    if (!isNaN(num) && num >= 0) {
      setAmountFromCurrency(value);
    }
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
            updatedAt={updatedAt}
          />

          <CurrencyInput
            amountLabel="Сколько отдаёте"
            currencyLabel="Валюта, которую отдаёте"
            amount={amountFromCurrency}
            currencyCode={fromCurrencyCode}
            currencies={currenciesMocks}
            onAmountChange={handleAmountChange}
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
        <CurrencyPairsList pairs={currencyPairsMocks} activePair={`${fromCurrencyCode}/${toCurrencyCode}`} />

        <CurrencyInformation
          key={`${fromCurrencyCode}-${toCurrencyCode}`}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
        {/* Изменении валютной пары меняет key и приводит к пересозданию компонента. Так как внутри компонента есть хук useState,
        который сбросит значение shown, описание при выборе новой валютной пары будет закрыто */}
      </div>
    </main>
  );
};
