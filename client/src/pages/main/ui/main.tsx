import React from 'react';
import { Header } from '../../../widgets/header';
import { NavLeft } from '../../../shared/ui/LeftNavbar';
import { RightNavbarPost, Audio } from '../../../shared/ui';
import styles from './styles.module.scss';

export const Main = () => {
  return (
    <div>
      <Header />

      <div className="main">
        <NavLeft />
        <div className={styles.content}>
          <Audio />
        </div>
        <RightNavbarPost />
      </div>
    </div>
  );
};
