import styles from './FilterButtons.module.scss';
import { Button } from '../Button/Button';

type FilterButtonsProps = {
  onSave: () => void;
  onClear: () => void;
};

export const FilterButtons = ({ onSave, onClear }: FilterButtonsProps) => {
  return (
    <div className={styles.container}>
      <Button kind="save" className={styles.button} onClick={onSave}>
        + SAVE FILTER
      </Button>
      <Button kind="clear" className={styles.button} onClick={onClear}>
        CLEAR FILTERS
      </Button>
    </div>
  );
};
