import styled from 'styled-components';
import { colorPalette } from '../utils/enum/colorPalette';
import { fontSize } from '../utils/enum/fontSize';

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 28rem;
  height: 18rem;
  background-color: ${colorPalette.whiteColor};
  border-radius: 10px;
  padding: 4rem;
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${fontSize.basic};
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  & svg {
    font-size: 4rem;
    color: ${colorPalette.modalIconColor};
    margin-bottom: 1rem;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
export const ModalButtonWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  & button {
    width: 5rem;
    height: 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  & button:first-child {
    margin-right: 1rem;
    background-color: ${colorPalette.modalCancelButtonColor};
  }
  & button:last-child {
    background-color: ${colorPalette.heavyColor};
    color: ${colorPalette.whiteColor};
  }
`;

// ItemCard 컴포넌트의 스타일을 정의
export const ItemCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22.5rem;
  height: 21rem;
  border-bottom: 1px solid ${colorPalette.borderColor};
  cursor: pointer;
  & img:hover {
    opacity: 0.9;
    transition: opacity 0.1s linear;
  }
`;
export const ItemImage = styled.img`
  height: 13.473rem;
  margin-bottom: 15px;
`;
export const ItemInfo = styled.div`
  max-width: 13.266rem;
`;
export const ItemName = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 4.15px;
`;
export const ItemDescription = styled.div`
  height: 0.97rem;
  overflow: hidden;
  font-size: 11px;
  color: ${colorPalette.grayTextColor};
`;
export const ItemLocationWrapper = styled.div`
  display: flex;
  color: ${colorPalette.lightGrayTextColor};
  font-size: 10px;
  margin-bottom: 1.104rem;
`;

export const PriceFavoriteWrapper = styled.div<{ isHeartClicked: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${colorPalette.heavyColor};
  & svg {
    color: ${(prop) =>
      prop.isHeartClicked
        ? `${colorPalette.heavyColor}`
        : `${colorPalette.itemCardHeartColor}`};
    font-size: 18px;
    transform: translateY(-5px);
    transition: color 0.2s ease-in-out;
  }
`;
export const ItemPrice = styled.div``;

// Button
export const DefaultBtn = styled.button`
  background-color: #0d4c92;
  color: #fff;
  height: 28px;
  width: 80px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 1px 1px #888;
  &:hover {
    background-color: #1d5799;
  }
  &:active {
    transform: scale(0.98);
  }
`;
