import styles from "./App.module.scss";
import { HeaderCurrencyConverter } from './components/HeaderCurrencyConverter/HeaderCurrencyConverter';
import { CurrencyInput } from "../src/components/CurrencyInput/CurrencyInput";
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart';
import { ListCurrencyPairs } from './components/ListCurrencyPairs/ListCurrencyPairs';
import { CurrencyInformation } from "./components/CurrencyInformation/CurrencyInformation";
import { currencies } from "../src/data/currencies";
import { currencyPairs } from "../src/data/currencyPairs";
import { currenciesDescriptions } from "./data/currenciesDescriptions";
import { chartPeriods } from "./data/chartPeriods";

export const App = () => {
  return (
    <main className={styles.page}>
      <div className={styles['top-half']}>
        <div className={styles['left-column']}>
          <HeaderCurrencyConverter
            fromAmountCurrency="1"
            fromNameCurrency="Polish zloty"
            toAmountCurrency="0.99"
            toNameCurrency="Japanese yen"
            date="Fri, 05 Apr 2026"
            time="10:35 UTC"
          />

          <CurrencyInput
            amountLabel="Сколько отдаёте"
            currencyLabel="Валюта, которую отдаёте"
            amount="1"
            currencyCode="PLN"
            currencies={currencies}
          />

          <CurrencyInput
            amountLabel="Сколько получаете"
            currencyLabel="Валюта, которую получаете"
            amount="0.99"
            currencyCode="JPY"
            currencies={currencies}
          />

          <FilterButtons />
        </div>
        <div className={styles['right-column']}>
          <CurrencyChart 
            periods = {chartPeriods}
            currentPeriod={4}
          />
        </div>
      </div>
      
      <div className={styles['bottom-half']}>
        <ListCurrencyPairs pairs={ currencyPairs } />

        <CurrencyInformation
          fromCurrencyCode="PLN"
          fromCurrencyTitle="Polish zloty"
          fromCurrencySymbol="zł"
          fromCurrencyDescription={currenciesDescriptions("PLN")}
          toCurrencyCode="JPY"
          toCurrencyTitle="Japanese yen"
          toCurrencySymbol ="¥"
          toCurrencyDescription={currenciesDescriptions("JPY")}
        />
      </div>
    </main>
  );
};