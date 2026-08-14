import type { Currency } from "../../types/currency";
import styles from "./CurrencyInput.module.scss";

type CurrencyInputProps = {
  amountLabel: string;
  currencyLabel: string;
  amount: string;
  currencyCode: string;
  currencies: Currency[];
};

export const CurrencyInput = ({
  amountLabel,
  currencyLabel,
  amount,
  currencyCode,
  currencies,
}: CurrencyInputProps) => {
  return (
    <div className={styles.field}>
      <input
        className={styles.amount}
        type="text"
        inputMode="decimal"
        aria-label={amountLabel}
        value={amount}
        readOnly
      />

      <select
        className={styles.currency}
        aria-label={currencyLabel}
        value={currencyCode}
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