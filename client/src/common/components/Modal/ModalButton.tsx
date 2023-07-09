import { ModalButtonProps } from '../../type';

const ModalButton = ({ children }: ModalButtonProps) => {
  //나중에 merge 이후 버튼 컴포넌트 사용
  return <button>{children}</button>;
};

export default ModalButton;
