import styles from "./ListCurrencyPairs.module.scss";
import type { CurrencyPair } from "../../types/currencyPair";

type ListCurrencyPairsProps = {
    pairs: CurrencyPair[];
}

export const ListCurrencyPairs = ({ pairs }: ListCurrencyPairsProps) => {
  return (
    <div className={styles.container}>
        {pairs.map(({fromCurrency, toCurrency, isActive }) => {
            const stylePair = isActive ? styles['active-pair'] : styles['noactive-pair'];
            return(
                <button
                    key={`${fromCurrency}/${toCurrency}`}
                    className={`${styles['default']} ${stylePair}`}
                >
                    {fromCurrency}/{toCurrency}
                </button>
            );
        })}
    </div>
  );
};