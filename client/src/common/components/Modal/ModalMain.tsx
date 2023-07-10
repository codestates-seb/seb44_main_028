import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdError } from 'react-icons/md';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import { ModalMainProps } from '../../type';
import {
  ModalOverlay,
  ModalWrapper,
  ModalInfoWrapper,
} from '../../style/style';

const ModalMain = ({ children, isOpen }: ModalMainProps) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
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
        <ModalWrapper ref={modalRef}>
          <ModalInfoWrapper onClick={handleModalContentClick}>
            <MdError />
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
});
