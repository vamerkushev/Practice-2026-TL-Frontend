import styles from './CurrencyPairsList.module.scss';
import type { CurrencyPair } from '../../types/currencyPair';
import { Button } from '../Button/Button';

type CurrencyPairsListProps = {
  pairs: CurrencyPair[];
  activePair: string;
  onSelect: (from: string, to: string) => void;
};

export const CurrencyPairsList = ({ pairs, activePair, onSelect }: CurrencyPairsListProps) => {
  if (pairs.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      {pairs.map(({ fromCurrency, toCurrency }) => {
        const pair = `${fromCurrency}/${toCurrency}`;
        return (
          <Button
            key={pair}
            kind={pair === activePair ? 'active' : 'default'}
            className={styles.button}
            onClick={() => onSelect(fromCurrency, toCurrency)}
          >
            {pair}
          </Button>
        );
      })}
    </div>
  );
};
