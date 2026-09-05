import styles from './CurrenciesSwapButton.module.scss';
import { Button } from '../Button/Button';
import swap from '../../images/swap.jpg';

type CurrenciesSwapButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export const CurrenciesSwapButton = ({ onClick, disabled = false }: CurrenciesSwapButtonProps) => {
  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={onClick} disabled={disabled}>
        <img className={styles.swap} src={swap} alt="swap-currencies"></img>
      </Button>
    </div>
  );
};
