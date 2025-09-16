import { useState } from 'react';
import styles from './style.module.scss';

import { ModalSettings } from '../ModalSettings';
import { PlusIcon, SetIcon } from '../../../assets';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { routes } from '../../api/routes';

export const RightNavbarPost = () => {
  const [active, setActive] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [showSet, setShowSettings] = useState(false);

  const onActive = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };
  const onActiveType = (id: number) => {
    if (id !== activeType) {
      setActiveType(id);
    }
  };
  return (
    <div className={styles.container}>
      {showSet && <ModalSettings onClose={() => setShowSettings(false)} />}
      <div className={styles.container__inner}>
        <div className={styles.tabs}>
          <div
            className={clsx(styles.tabs__item, active === 0 && styles.active)}
            onClick={() => onActive(0)}>
            Все
          </div>
          <div
            className={clsx(styles.tabs__item, active === 1 && styles.active)}
            onClick={() => onActive(1)}>
            Мои посты
          </div>
          <div
            className={clsx(styles.tabs__item, active === 2 && styles.active)}
            onClick={() => onActive(2)}>
            Избранное
          </div>
        </div>
        <div className={styles.filter} onClick={() => setShowSettings(true)}>
          Фильтр <SetIcon />
        </div>
        <div className={styles.postTypeWrap}>
          <ul className={styles.typeList}>
            <li
              className={clsx(styles.typeList__item, activeType === 0 && styles.active)}
              onClick={() => onActiveType(0)}>
              Все посты
            </li>
            <li
              className={clsx(styles.typeList__item, activeType === 1 && styles.active)}
              onClick={() => onActiveType(1)}>
              Фото
            </li>
            <li
              className={clsx(styles.typeList__item, activeType === 2 && styles.active)}
              onClick={() => onActiveType(2)}>
              Видео
            </li>
            <li
              className={clsx(styles.typeList__item, activeType === 3 && styles.active)}
              onClick={() => onActiveType(3)}>
              Аудио
            </li>
            <li
              className={clsx(styles.typeList__item, activeType === 4 && styles.active)}
              onClick={() => onActiveType(4)}>
              С жалобами
            </li>
          </ul>
          <Link className={styles.addPost} to={routes.postCreate}>
            <PlusIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};
