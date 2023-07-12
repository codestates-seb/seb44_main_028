import { ModalButtonProps } from '../../type';
import { DefaultBtn } from '../Button';
const ModalButton = ({
  color,
  backgroundColor,
  hoverBackgroundColor,
  children,
  onClick,
}: ModalButtonProps) => {
  //나중에 merge 이후 버튼 컴포넌트 사용
  return (
    <DefaultBtn
      color={color}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      onClick={onClick}
    >
      {children}
    </DefaultBtn>
  );
};

export default ModalButton;
