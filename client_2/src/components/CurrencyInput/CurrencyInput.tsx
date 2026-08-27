import type { Currency } from '../../types/currency';
import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
  amountLabel: string;
  currencyLabel: string;
  amount: string;
  currencyCode: string;
  currencies: Currency[];
  onAmountChange?: (value: string) => void;
  onCurrencyChange?: (value: string) => void;
  readonly?: boolean;
};

export const CurrencyInput = ({
  amountLabel,
  currencyLabel,
  amount,
  currencyCode,
  currencies,
  onAmountChange,
  onCurrencyChange,
  readonly = false
}: CurrencyInputProps) => {
  return (
    <div className={styles.field}>
      <input
        className={styles.amount}
        type="text"
        inputMode="decimal"
        aria-label={amountLabel}
        value={amount}
        onChange={(event) => onAmountChange?.(event.target.value)}
        readOnly={readonly}
      />

      <select
        className={styles.currency}
        aria-label={currencyLabel}
        value={currencyCode}
        onChange={(event) => onCurrencyChange?.(event.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};
