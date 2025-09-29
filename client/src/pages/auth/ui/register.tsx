import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { Button, Input } from '../../../shared/ui';
import { routes } from '../../../shared/api/routes';
import { registerUser } from '../api/authSlice';
import { useAppDispatch } from '../../../shared/hooks/useDispatch';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = () =>
  yup.object().shape({
    username: yup
      .string()
      .required('Поле обязательно к заполнению')
      .min(4, 'Минимальная длина имени 6')
      .max(20, 'Максимальная длина имени 20'),
    password: yup
      .string()
      .required('Поле обязательно к заполнению')
      .min(6, 'Минимальная длина символов 6')
      .max(20, 'Максимальная длина символов 20'),
    repeatPassword: yup
      .string()
      .required('Поле обязательно к заполнению')
      .oneOf([yup.ref('password')], 'Пароли не совпадают'),
  });

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setError,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema()),
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const submit = () => {
    const { username, password } = getValues();
    const obj = { username, password };
    dispatch(registerUser(obj))
      .unwrap()
      .then(() => {
        reset();
        navigate(routes.main);
      })
      .catch((e) => {
        if (e.data.message) {
          setError('username', { type: 'validate', message: e.data.message });
        }
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titleLogin}>social</h2>
      <div className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit(submit)}>
          <p className={styles.form__title}>Регистрация</p>
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Никнейм пользователя"
                error={errors?.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                type="password"
                {...field}
                placeholder="Пароль"
                error={errors?.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="repeatPassword"
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Повторите пароль"
                error={errors?.repeatPassword?.message}
              />
            )}
          />

          <Button type="submit">Продолжить</Button>
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
