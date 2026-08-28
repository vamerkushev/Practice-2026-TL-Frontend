import styles from './Button.module.scss';
import type { ReactNode } from 'react';

type ButtonProps = {
  kind?: 'default' | 'active' | 'save' | 'clear';
  className?: string;
  children: ReactNode;
} & React.ComponentProps<'button'>;

export const Button = ({ kind = 'default', className = '', children, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[kind]} ${className}`} {...props}>
      {children}
    </button>
  );
};
