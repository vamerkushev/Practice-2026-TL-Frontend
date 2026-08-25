import styles from './Button.module.scss';
import type { ReactNode } from 'react';

type ButtonProps = {
  type?: 'default' | 'active' | 'save' | 'clear';
  className?: string;
  children: ReactNode;
};

export const Button = ({ type = 'default', className = '', children }: ButtonProps) => {
  return <button className={`${styles.button} ${styles[type]} ${className}`}>{children}</button>;
};
