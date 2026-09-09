import styles from './FilterButtons.module.scss';
import { Button } from '../Button/Button';

export const FilterButtons = () => {
  return (
    <div className={styles.container}>
      <Button kind="save" className={styles.button}>
        + SAVE FILTER
      </Button>
      <Button kind="clear" className={styles.button}>
        CLEAR FILTERS
      </Button>
    </div>
  );
};
