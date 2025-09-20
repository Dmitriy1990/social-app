import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './style.module.scss';

type Props = {
  primary?: boolean;
  ttu?: boolean;
  small?: boolean;
  children: ReactNode;
};

export const Button: FC<Props> = ({ primary, ttu, small, children }) => {
  return (
    <button
      className={clsx(
        styles.button,
        primary && styles.primary,
        ttu && styles.ttu,
        small && styles.small,
      )}>
      {children}
    </button>
  );
};
