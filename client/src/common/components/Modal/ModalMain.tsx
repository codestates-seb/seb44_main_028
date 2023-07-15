import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import ModalAdditional from './ModalAdditional';
import { ModalMainProps } from '../../type';
import {
  ModalOverlay,
  ModalWrapper,
  ModalInfoWrapper,
} from '../../style/style';

const ModalMain = ({ children, isOpen }: ModalMainProps) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const handleCloseModal = () => {
    setIsOverlayVisible(false);
  };
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  if (!isOpen) return null;
  return createPortal(
    <>
      {isOverlayVisible && <ModalOverlay onClick={handleCloseModal} />}
      {isOverlayVisible && (
        <ModalWrapper>
          <ModalInfoWrapper onClick={handleModalContentClick}>
            {children}
          </ModalInfoWrapper>
        </ModalWrapper>
      )}
    </>,
    document.body,
  );
};

export default Object.assign(ModalMain, {
  Title: ModalTitle,
  Button: ModalButton,
  Additional: ModalAdditional,
});
