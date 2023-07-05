import React, { ReactNode, TouchEvent } from 'react';
import { ModalWrapper, Close } from '../style';
type ModalProps = {
  setIsOpen: Dispatch<boolean>;
  children: ReactNode;
};

function Modal({ children, setIsOpen }: ModalProps) {
  const closeModal = (e: TouchEvent<HTMLDivElement>) => {
    if ((e?.target as Element)?.contains(e?.currentTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <ModalWrapper onTouchEnd={(e) => closeModal(e)}>
      <div>{children}</div>
      <Close onTouchEnd={() => setIsOpen(false)}>X</Close>
    </ModalWrapper>
  );
}

export default Modal;
