import styles from './CurrencyPairsList.module.scss';
import type { CurrencyPair } from '../../types/currencyPair';
import { Button } from '../Button/Button';

type CurrencyPairsListProps = {
  pairs: CurrencyPair[];
  activePair: string;
};

export const CurrencyPairsList = ({ pairs, activePair }: CurrencyPairsListProps) => {
  return (
    <div className={styles.container}>
      {pairs.map(({ fromCurrency, toCurrency }) => {
        const pair = `${fromCurrency}/${toCurrency}`;
        return (
          <Button key={pair} type={pair === activePair ? 'active' : 'default'} className={styles.button}>
            {pair}
          </Button>
        );
      })}
    </div>
  );
};
