import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

import { Button, Input } from '../../../shared/ui';
import { routes } from '../../../shared/api/routes';

export const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titleLogin}>social</h2>
      <div className={styles.main}>
        <form className={styles.form} onSubmit={submit}>
          <p className={styles.form__title}>Войдите через аккаунт</p>
          <Input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Аккаунт"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
          />
          <Button>войти</Button>
        </form>
        <Link className={styles.restore} to={routes.restore}>
          Восстановить доступ
        </Link>
      </div>
      <div className={styles.footerBlock}>
        <Link className={styles.linkTo} to={routes.register}>
          Регистрация
        </Link>
      </div>
    </div>
  );
};
