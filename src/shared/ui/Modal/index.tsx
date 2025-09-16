import type { ReactNode } from 'react';
import styles from './style.module.scss';
import { Portal } from '../Portal';

type ModalProps = {
  onClose: () => void;
  close?: boolean;
  children: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ children, onClose, close }: ModalProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <div className={styles.modal__container}>
        <div className={styles.modal__center} onClick={handleContainerClick}>
          <div className={styles.modal__component}>{children}</div>
        </div>
      </div>
    </Portal>
  );
};
