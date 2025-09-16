import React from 'react';
import { HomeIcon, MessageIcon, NotifyIcon } from '../../../assets';
import styles from './style.module.scss';
import { NavLink } from 'react-router-dom';
import { routes } from '../../api/routes';

export const NavLeft = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navListItem}>
          <NavLink className={styles.navLink} to={routes.main}>
            <HomeIcon />
            <div className={styles.text}>Главная</div>
          </NavLink>
        </li>
        <li className={styles.navListItem}>
          <NavLink className={styles.navLink} to={routes.notifications}>
            <NotifyIcon />
            <div className={styles.text}>Уведомления</div> <span className={styles.badge}>10</span>
          </NavLink>
        </li>
        <li className={styles.navListItem}>
          <NavLink className={styles.navLink} to={routes.messages}>
            <MessageIcon />
            <div className={styles.text}>Месседжер</div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
