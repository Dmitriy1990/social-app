import React from 'react';
import { UserIcon } from '../../../assets';
import styles from './styled.module.scss';
import clsx from 'clsx';

type Props = {
  image?: string;
  size?: number;
  big?: boolean;
};

export const Avatar: React.FC<Props> = ({ size = 30, image, big }: Props) => {
  return (
    <div className={clsx(styles.avatar, big && styles.big)}>
      {image ? <img src={image} style={{ width: size, height: size }} alt="" /> : <UserIcon />}
    </div>
  );
};
