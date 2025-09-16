import React, { useState } from 'react';
import { Avatar } from '../Avatar';
import { Dropdown } from '../Dropdown';
import { ModalWrap } from '../ModalWrap';
import styles from './style.module.scss';

import { img4, SearchIcon } from '../../../assets';
import clsx from 'clsx';

type Props = {
  onClose: () => void;
};

export const ModalSettings: React.FC<Props> = ({ onClose }: Props) => {
  const [active, setActive] = useState(0);
  const [showSelected, setShowSelected] = useState<string | null>(null);

  const onActive = (id: number) => {
    if (active !== id) {
      setActive(id);
    }
  };
  return (
    <ModalWrap onClose={onClose}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <div
            className={clsx(styles.tabs__item, active === 0 && styles.active)}
            onClick={() => onActive(0)}>
            Все
          </div>
          <div
            className={clsx(styles.tabs__item, active === 1 && styles.active)}
            onClick={() => onActive(1)}>
            Показываются <span>45</span>
          </div>
          <div
            className={clsx(styles.tabs__item, active === 2 && styles.active)}
            onClick={() => onActive(2)}>
            Скрыты <span>18</span>
          </div>
        </div>
      </div>
      <div className={styles.subHeader}>
        <SearchIcon className={styles.searchIcon} />
        <input className={styles.input} placeholder="Быстрый поиск" />
        <Dropdown
          defaultValue="Действия"
          options={['Действия']}
          selected={showSelected}
          setSelected={setShowSelected}
          blue
          mN
        />
      </div>
      <div className={styles.group}>
        <Avatar size={50} image={img4} />
        <div className={styles.textContainer}>
          <span className={styles.text}>Сарказм</span>
        </div>
      </div>
      <div className={styles.group}>
        <Avatar size={50} image={img4} />
        <div className={styles.textContainer}>
          <span className={styles.text}>Дзен</span>
        </div>
      </div>
      <div className={styles.group}>
        <Avatar size={50} image={img4} />
        <div className={styles.textContainer}>
          <span className={styles.text}>Убойный юмор</span>
        </div>
      </div>
    </ModalWrap>
  );
};
