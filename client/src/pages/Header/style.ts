import styled, { css, keyframes } from 'styled-components';
import { colorPalette } from '../../common/utils/enum/colorPalette';
import { fontSize } from '../../common/utils/enum/fontSize';
import { border } from '../../common/utils/enum/border';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  height: 4.5rem;
  padding: 1.375rem 2.625rem;
  font-size: 16px;
  border-bottom: ${border.basic};
  background-color: ${colorPalette.whiteColor};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 5;
  & svg,
  li {
    cursor: pointer;
  }
  & svg:hover,
  li:hover {
    color: ${colorPalette.accentColor};
    transition: color 0.2s ease-in-out;
  }
`;
export const LogoWrapper = styled.div`
  width: 10%;
  font-size: ${fontSize.headerNavText};
  font-weight: 700;
  color: ${colorPalette.deepMintColor};
`;
export const NavWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > ol {
    display: flex;
  }
`;
export const NavList = styled.li`
  margin-right: 1.5rem;
`;
export const NavIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const NavSendIconWrapper = styled.div`
  font-size: ${fontSize.headerIconSize};
  margin-right: 10.125rem;
  margin-left: 2rem;
`;
const slideInFromLeft = keyframes`
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    width: 220px;
    opacity: 1;
  }
`;
const slideOutToRight = keyframes`
  0% {
    width: 220px;
    opacity: 1;
  } 
  100% {
    width: 0;
    opacity: 0;
  }
`;
export const NavSearchForm = styled.form<{ isClick: boolean }>`
  display: flex;
  align-items: center;
  & > svg {
    width: 20px;
    height: 20px;
    z-index: 1;
    color: ${(props) =>
      props.isClick ? `${colorPalette.whiteColor}` : 'inherit'};
  }
  & > input {
    height: 26px;
    border-radius: 20px;
    transform: translateX(28px);
    background-color: ${colorPalette.headerSearchColor};
    border: none;
    padding: 0.5rem 1rem;
    padding-right: 2.5rem;
    animation: ${({ isClick }) =>
      isClick
        ? css`
            ${slideInFromLeft} 0.3s ease-in-out forwards;
          `
        : css`
            ${slideOutToRight} 0.3s ease-in-out forwards;
          `};
  }
  & > input:focus {
    outline: none;
  }
`;

export const ActionWrapper = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > svg {
    color: black;
    font-size: 20px;
  }
  position: relative;
`;
export const LogoutInfo = styled.div<{ isHovered: boolean }>`
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 70px;
  height: 35px;
  background-color: ${colorPalette.whiteColor};
  top: 30px;
  right: -15px;
  border-radius: 5px;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.1));
  &::before {
    content: '';
    border-right: 13px solid transparent;
    border-bottom: 13px solid ${colorPalette.whiteColor};
    position: absolute;
    top: -9px;
    right: 17px;
  }
  ${({ isHovered }) =>
    isHovered &&
    css`
      display: flex;
    `}
`;
