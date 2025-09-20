import React, { useState, useRef } from 'react';
import useOnClickOutside from '../../../shared/hooks/useOutside';
import { ArrowIcon, BackIcon, LogoIcon, SearchIcon, SettingsIcon, user } from '../../../assets';
import styles from './header.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Avatar } from '../../../shared/ui';

type Props = {
  children?: React.ReactNode;
};

export const Header: React.FC<Props> = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSeach] = useState(false);

  const ref = useRef<HTMLFormElement>(null);

  const handleClickOutside = () => {
    setOpen(false);
    setSeach(false);
  };
  useOnClickOutside(ref as React.RefObject<HTMLElement>, handleClickOutside);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className={styles.burger}>
          <div className={styles.burgerItem} />
          <div className={styles.burgerItem} />
          <div className={styles.burgerItem} />
        </div>
        <div className={clsx(styles.headerLeft, open ? styles.open : '')}>
          <Link to={'/'}>
            <LogoIcon className={styles.logo} />
          </Link>
          <button className={styles.backButton}>
            <BackIcon className={styles.back} />
          </button>
          <>{children}</>
        </div>
        <div className={styles.headerRight}>
          <form className={clsx(styles.searchBlock, open ? styles.open : '')} ref={ref}>
            <SettingsIcon className={styles.settings} onClick={() => setSeach(!search)} />
            <input className={styles.input} onFocus={() => setOpen(true)} />
            <button className={styles.searchBtn}>
              <SearchIcon />
            </button>
            <div className={clsx(styles.settingMenu, open ? styles.open : '')}>
              <Link className={styles.settingHeader} to="/">
                <p style={{ fontSize: 14 }}>Показать все результаты</p>
                <ArrowIcon className={styles.arrowHeader} />
              </Link>
              <ul className={styles.settingList}>
                <li>
                  <Link className={styles.settingListLink} to="/">
                    Публикации
                  </Link>
                </li>
                <li>
                  <Link className={styles.settingListLink} to="/">
                    Люди
                  </Link>
                </li>
                <li>
                  <Link className={styles.settingListLink} to="/">
                    Группы
                  </Link>
                </li>
              </ul>
            </div>
          </form>
          <div className={styles.userMenu}>
            <div className={styles.userName} title="Дарья Кузнецова">
              Дарья Кузнецова
            </div>
            <Avatar image={user} />
            <ArrowIcon />
          </div>
        </div>
      </div>
    </header>
  );
};
