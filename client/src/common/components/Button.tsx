import styled from 'styled-components';
import { BoxShadow } from '../utils/enum/boxShadow';

type DefaultBtnprops = {
  color: string;
  backgroundColor: string;
  hoverBackgroundColor?: string;
};
export const DefaultBtn = styled.button<DefaultBtnprops>`
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  height: 28px;
  width: 80px;
  border-radius: 5px;
  border: none;
  box-shadow: ${BoxShadow.Basic};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverBackgroundColor};
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
  color,
  backgroundColor,
  hoverBackgroundColor,
  height,
  width,
  children,
  onClick,
  style,
}: {
  color: string;
  backgroundColor: string;
  hoverBackgroundColor?: string;
  height: number;
  width: number;
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <BigDefaultBtn
      color={color}
      backgroundColor={backgroundColor}
      hoverBackgroundColor={hoverBackgroundColor}
      height={height}
      width={width}
      onClick={onClick}
      style={style}
    >
      {children}
    </BigDefaultBtn>
  );
}
export default BigBtn;
