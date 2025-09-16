import type { FC, ReactNode } from 'react';
import { Modal } from '../Modal';
import styles from './style.module.scss';
import { CloseIcon } from '../../../assets';

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export const ModalWrap: FC<Props> = ({ onClose, children }: Props) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        {children}
        <CloseIcon className={styles.close} onClick={onClose} />
      </div>
    </Modal>
  );
};
