import type { FC } from 'react';
import styles from './style.module.scss';
import clsx from 'clsx';
import { ArrowIcon, CheckIcon } from '../../../assets';

type Props = {
  blue?: boolean;
  options: string[];
  selected: string | null;
  setSelected: (str: string) => void;
  defaultValue: string;
  resetValue?: boolean;
  mN?: boolean;
};

export const Dropdown: FC<Props> = ({
  options,
  defaultValue,
  blue,
  selected,
  setSelected,
  resetValue,
  mN,
}: Props) => {
  const change = (item: string) => {
    setSelected(item);
  };

  const reset = () => {
    setSelected('');
  };

  return (
    <div className={styles.actionItem} role="button" tabIndex={-1}>
      <div className={clsx(styles.head)}>{selected ? selected : defaultValue}</div>
      <ArrowIcon className={styles.arrow} />
      <ul className={styles.actionMenu}>
        {resetValue && (
          <li className={styles.actionMenu__item} role="button" tabIndex={8} onClick={reset}>
            <div>Не выбрано</div> {!selected && <CheckIcon className={styles.check} />}
          </li>
        )}
        {options.map((item, idx) => (
          <li
            className={styles.actionMenu__item}
            key={item}
            role="button"
            tabIndex={idx + 1}
            onClick={() => change(item)}>
            <div>{item}</div> {selected === item ? <CheckIcon className={styles.check} /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
};
