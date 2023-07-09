import { ModalButtonProps } from '../../type';

const ModalButton = ({ children, onClick }: ModalButtonProps) => {
  //나중에 merge 이후 버튼 컴포넌트 사용
  return <button onClick={onClick}>{children}</button>;
};

export default ModalButton;
