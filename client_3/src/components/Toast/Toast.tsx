import { useEffect, useState } from 'react';
import styles from './Toast.module.scss';

type ToastProps = {
  message: string | null;
  duration?: number;
};

export const Toast = ({ message, duration = 3000 }: ToastProps) => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (!message) {
      setDisplay(false);
      return;
    }

    setDisplay(true);

    const timer = setTimeout(() => setDisplay(false), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!display) return null;

  return <div className={styles.toast}>{message}</div>;
};
