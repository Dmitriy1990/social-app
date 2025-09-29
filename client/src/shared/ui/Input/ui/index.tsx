import React, { forwardRef } from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ value, type = 'text', className, error, ...rest }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={clsx(styles.input, error && styles.error, className ?? '')}
          value={value}
          type={type}
          {...rest}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
