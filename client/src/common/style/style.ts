import styled from 'styled-components';
import { colorPalette } from '../utils/enum/colorPalette';

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
  }
`;
export const ItemPrice = styled.div``;
