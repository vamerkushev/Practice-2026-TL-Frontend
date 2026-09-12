import styles from './App.module.scss';
import { CurrencyConverterHeader } from './components/CurrencyConverterHeader/CurrencyConverterHeader';
import { CurrencyInput } from '../src/components/CurrencyInput/CurrencyInput';
import { FilterButtons } from './components/FilterButtons/FilterButtons';
import { CurrencyChart } from './components/CurrencyChart/CurrencyChart';
import { CurrencyPairsList } from './components/CurrencyPairsList/CurrencyPairsList';
import { CurrencyInformation } from './components/CurrencyInformation/CurrencyInformation';
import { CurrenciesSwapButton } from './components/CurrenciesSwapButton/CurrenciesSwapButton';
import { useConverter } from './hooks/useConverter';
import { Loading } from './components/Loading/Loading';
import { Toast } from './components/Toast/Toast';
import { ServerError } from './components/ServerError/ServerError';
import { useSavedFilters } from './hooks/useSavedFilters';

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
    pricesLoading,
    currenciesLoading,
    pricesError,
    currenciesError,
    period,
    handlePeriodChange,
    pricesState
  } = useConverter();

  const { filters, addFilter, clearFilters } = useSavedFilters(currencies);

  if (currenciesLoading) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  if (currenciesError) {
    return <ServerError message="Не удалось загрузить данные! Проверьте соединение с сервером!" />;
  }

  if (!fromCurrency || !toCurrency) {
    return null;
  }

  return (
    <main className={styles.page}>
      {pricesError && <Toast message={`Ошибка загрузки курсов: ${pricesError}`!} />}

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

          <FilterButtons onSave={() => addFilter(fromCurrencyCode, toCurrencyCode)} onClear={clearFilters} />
        </div>
        <div className={styles['right-column']}>
          <CurrencyChart
            period={period}
            data={pricesState.data ?? []}
            isLoading={pricesState.loading}
            error={pricesState.error}
            onPeriodChange={handlePeriodChange}
          />
        </div>
      </div>

      <div className={styles['bottom-half']}>
        <CurrencyPairsList
          pairs={filters}
          activePair={`${fromCurrencyCode}/${toCurrencyCode}`}
          onSelect={(from, to) => {
            setFromCurrencyCode(from);
            setToCurrencyCode(to);
          }}
        />

        <CurrencyInformation
          key={`${fromCurrencyCode}-${toCurrencyCode}`}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </div>
    </main>
  );
};
