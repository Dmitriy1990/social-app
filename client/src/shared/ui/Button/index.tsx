import clsx from 'clsx';
import { forwardRef, type FC, type ReactNode } from 'react';
import styles from './style.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  primary?: boolean;
  ttu?: boolean;
  small?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ primary, ttu, small, children, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          primary && styles.primary,
          ttu && styles.ttu,
          small && styles.small,
          className ?? '',
        )}
        {...rest}>
        {children}
      </button>
    );
  },
);
