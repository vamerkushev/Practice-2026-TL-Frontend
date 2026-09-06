import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.loading}>
      LOADING
      <span className={styles.slash1}>/</span>
      <span className={styles.slash2}>/</span>
      <span className={styles.slash3}>/</span>
    </div>
  );
};
