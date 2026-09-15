import styles from './CurrenciesSwapButton.module.scss';
import { Button } from '../Button/Button';
import swap from '../../images/swap.jpg';

type CurrenciesSwapButtonProps = {
  onClick: () => void;
};

export const CurrenciesSwapButton = ({ onClick }: CurrenciesSwapButtonProps) => {
  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={onClick}>
        <img className={styles.swap} src={swap} alt="swap-currencies"></img>
      </Button>
    </div>
  );
};
