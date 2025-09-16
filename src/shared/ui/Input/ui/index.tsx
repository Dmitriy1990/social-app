import React from 'react';
import styles from './style.module.scss';

type Props = {
  placeholder?: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({ placeholder, value, onChange, type = 'text' }: Props) => {
  return (
    <div>
      <input
        className={styles.input}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
