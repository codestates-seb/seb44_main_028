import React from 'react';
import { MdError } from 'react-icons/md';
import ModalPortal from './ModalPortal';
import { ModalFrameProps } from '../.././type';
import {
  ModalWrapper,
  ModalOverlay,
  ModalButtonWrapper,
} from '../../style/style';

const ModalFrame: React.FC<ModalFrameProps> = ({
  leftButtonText,
  rightButtonText,
  children,
  setOnModal,
}: ModalFrameProps) => {
  return (
    <ModalPortal>
      <ModalOverlay onClick={() => setOnModal(false)} />
      <ModalWrapper>
        <MdError />
        <div>{children}</div>
        <ModalButtonWrapper>
          <button onClick={() => setOnModal(false)}>{leftButtonText}</button>
          <button>{rightButtonText}</button>
        </ModalButtonWrapper>
      </ModalWrapper>
    </ModalPortal>
  );
};

export default ModalFrame;
