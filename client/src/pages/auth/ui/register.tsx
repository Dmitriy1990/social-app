import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Button, Input } from '../../../shared/ui';
import { routes } from '../../../shared/api/routes';

export const Register = () => {
  const [account, setAccount] = useState('');
  const [nickName, setNickName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'alice', password: 'password123' }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titleLogin}>social</h2>
      <div className={styles.main}>
        <form className={styles.form} onSubmit={submit}>
          <p className={styles.form__title}>Регистрация</p>
          <Input
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="Никнейм пользователя"
          />
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
          <Input
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            placeholder="Повторите пароль"
          />
          <Button>Продолжить</Button>
        </form>
      </div>
      <div className={styles.footerBlock}>
        <Link className={styles.linkTo} to={routes.login}>
          Войти
        </Link>
      </div>
    </div>
  );
};
