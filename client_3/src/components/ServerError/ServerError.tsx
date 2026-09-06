import styles from './ServerError.module.scss';

type ServerErrorProps = {
  message: string;
};

export const ServerError = ({ message }: ServerErrorProps) => {
  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};
