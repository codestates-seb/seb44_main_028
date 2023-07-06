import React from 'react';
import ReactDOM from 'react-dom';
import { ModalPortalProps } from '../.././type';

const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
}: ModalPortalProps) => {
  const modalRoot =
    document.getElementById('modal-root') || document.createElement('div');
  return ReactDOM.createPortal(children, modalRoot);
};
export default ModalPortal;
