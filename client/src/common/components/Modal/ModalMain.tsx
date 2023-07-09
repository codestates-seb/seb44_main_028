import { createPortal } from 'react-dom';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import { ModalMainProps } from '../../type';

const ModalMain = ({ children, isOpen }: ModalMainProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div>
      {ModalTitle && <ModalTitle />}
      {ModalButton && <ModalButton />}
    </div>,
    document.body,
  );
};

export default ModalMain;
