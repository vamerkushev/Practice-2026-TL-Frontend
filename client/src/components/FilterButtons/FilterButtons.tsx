import styles from './FilterButtons.module.scss';
import { Button } from '../Button/Button';

export const FilterButtons = () => {
  return (
    <div className={styles.container}>
      <Button type="save" className={styles.button}>
        + SAVE FILTER
      </Button>
      <Button type="clear" className={styles.button}>
        CLEAR FILTERS
      </Button>
    </div>
  );
};
