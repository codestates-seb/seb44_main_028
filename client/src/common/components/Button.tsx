import styled from 'styled-components';
import { BoxShadow } from '../utils/enum/boxShadow';

export const DefaultBtn = styled.button`
  background-color: #0d4c92;
  color: #fff;
  height: 28px;
  width: 80px;
  border-radius: 5px;
  border: none;
  box-shadow: ${BoxShadow.Basic};
  &:hover {
    background-color: #1d5799;
  }
  &:active {
    transform: scale(0.98);
  }
`;

type BigDefaultBtnProps = {
  height: number;
  width: number;
};

const BigDefaultBtn = styled(DefaultBtn)<BigDefaultBtnProps>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  font-size: ${(props) => props.height / 3}px;
`;

function BigBtn({
  height,
  width,
  children,
  onClick,
}: {
  height: number;
  width: number;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <BigDefaultBtn height={height} width={width} onClick={onClick}>
      {children}
    </BigDefaultBtn>
  );
}
export default BigBtn;
