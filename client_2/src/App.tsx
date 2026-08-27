import styles from './App.module.scss';
import { CurrencyConverterHeader } from './components/CurrencyConverterHeader/CurrencyConverterHeader';
import { CurrencyInput } from '../src/components/CurrencyInput/CurrencyInput';
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart';
import { CurrencyPairsList } from './components/CurrencyPairsList/CurrencyPairsList';
import { CurrencyInformation } from './components/CurrencyInformation/CurrencyInformation';
import { currenciesMocks, getCurrency } from '../src/mocks/currenciesMocks';
import { currencyPairs } from '../src/data/currencyPairs';
import { chartPeriods } from './data/chartPeriods';

export const App = () => {
  return (
    <main className={styles.page}>
      <div className={styles['top-half']}>
        <div className={styles['left-column']}>
          <CurrencyConverterHeader
            fromAmountCurrency="1"
            fromCurrency={getCurrency('PLN')}
            toAmountCurrency="0.99"
            toCurrency={getCurrency('JPY')}
            date="Fri, 05 Apr 2026"
            time="10:35 UTC"
          />

          <CurrencyInput
            amountLabel="Сколько отдаёте"
            currencyLabel="Валюта, которую отдаёте"
            amount="1"
            currencyCode={getCurrency('PLN').code}
            currencies={currenciesMocks}
          />

          <CurrencyInput
            amountLabel="Сколько получаете"
            currencyLabel="Валюта, которую получаете"
            amount="0.99"
            currencyCode={getCurrency('JPY').code}
            currencies={currenciesMocks}
          />

          <FilterButtons />
        </div>
        <div className={styles['right-column']}>
          <CurrencyChart periods={chartPeriods} currentPeriod={4} />
        </div>
      </div>

      <div className={styles['bottom-half']}>
        <CurrencyPairsList pairs={currencyPairs} activePair="PLN/JPY" />

        <CurrencyInformation fromCurrency={getCurrency('PLN')} toCurrency={getCurrency('JPY')} />
      </div>
    </main>
  );
};
