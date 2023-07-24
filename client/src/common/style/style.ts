import styled, { css, keyframes } from 'styled-components';
import { BoxShadow } from '../utils/enum/boxShadow';
import { colorPalette } from '../utils/enum/colorPalette';
import { fontSize } from '../utils/enum/fontSize';
import { border } from '../utils/enum/border';
import { borderRadius } from '../utils/enum/borderRadius';

// ScrollToTop 컴포넌트의 스타일을 정의
export const ScrollToTopButtonContainer = styled.div`
  position: fixed;
  right: 3rem;
  bottom: 2rem;
  z-index: 1;
`;

export const TopButton = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: ${colorPalette.accentColor};
  color: ${colorPalette.whiteColor};
  border: none;
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: ${colorPalette.lightColor};
    color: ${colorPalette.accentColor};
  }
`;
export const CategoryContainer = styled.div`
  display: grid;
  padding: 0 10rem;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem 0;
`;

export const CategoryButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${fontSize.basic};
  cursor: pointer;
  & img {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }
`;
// Modal 컴포넌트의 스타일을 정의
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
  z-index: 6;
  box-shadow: ${BoxShadow.Basic};
  & svg {
    font-size: 4rem;
    color: ${colorPalette.modalIconColor};
    margin-bottom: 1rem;
  }
  & button {
    margin-right: 0.438rem;
    margin-top: 0.938rem;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colorPalette.ModalBackgroundColor};
  z-index: 5;
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
export const ModalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ModalChildrenWrapper = styled.div`
  display: flex;
`;
// ItemCardList 컴포넌트의 스타일을 정의
export const ItemCardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8.063rem;

  & p {
    font-size: 24px;
    margin-bottom: 1.25rem;
  }
`;
export const ItemCardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;
// ItemCard 컴포넌트의 스타일을 정의
export const ItemCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  width: 22.5rem;
  height: 22rem;
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
export const ItemName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 4.15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const ItemDescription = styled.div`
  overflow: hidden;
  height: 0.9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  font-weight: bold;
  margin-bottom: 1.248rem;
  & svg {
    color: ${(prop) =>
      prop.isHeartClicked
        ? `${colorPalette.itemCardHeartFillColor}`
        : `${colorPalette.itemCardHeartColor}`};
    font-size: 16px;
    transform: translateY(-5px);
    transition: color 0.2s ease-in-out;
  }
`;
export const ItemPrice = styled.div`
  font-weight: 500;
`;
// Button
export const DefaultBtn = styled.button`
  background-color: ${colorPalette.heavyColor};
  color: ${colorPalette.whiteColor};
  height: 28px;
  width: 80px;
  border-radius: 5px;
  border: none;
  box-shadow: ${BoxShadow.Basic};
  &:hover {
    background-color: ${colorPalette.lightNavyColor};
  }
  &:active {
    transform: scale(0.98);
  }
`;
// SelectBox 컴포넌트의 스타일을 정의
export const SelectBoxWrapper = styled.div`
  display: inline-block;
  width: 16.75rem;
  height: 2.995rem;
  border: ${border.basic};
  border-radius: 5px;
  font-weight: 700;
  margin-right: 2.75rem;
`;
const onRotate = keyframes`
  from {
    transform: rotate(0deg);
    }
  to {
    transform: rotate(-180deg);
    }
`;
const offRotate = keyframes`
  from {
    transform: rotate(-90deg);
    }
  to {
    transform: rotate(0deg);
    }
`;
export const Selected = styled.div<{ isClick: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.713rem 0;
  padding-left: 1.75rem;
  padding-right: 0.888rem;

  & svg {
    font-size: 1.5rem;
    margin-left: -35px;
    animation: ${({ isClick }) =>
      isClick
        ? css`
            ${onRotate} 0.3s forwards
          `
        : css`
            ${offRotate} 0.3s forwards
          `};
  }
`;
export const SelectedValue = styled.div`
  max-width: 130px;
`;
const fadeIn = keyframes`
  from {
    opacity: 0;
    }
  to {
    opacity: 1;
    }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
    }
  to {
    opacity: 0;
    }
`;
export const OptionWrapper = styled.ul<{ isClick: boolean }>`
  z-index: 10;
  width: 16.75rem;
  border: ${border.basic};
  position: absolute;
  margin: 10px 0 0 -1px;
  border-radius: 5px;
  cursor: pointer;
  display: ${({ isClick }) => (isClick ? 'block' : 'none')};
  animation: ${({ isClick }) =>
    isClick
      ? css`
          ${fadeIn} 0.3s forwards
        `
      : css`
          ${fadeOut} 0.3s forwards
        `};
`;
export const Option = styled.li`
  padding: 1rem 0;
  padding-left: 1.75rem;
  background-color: ${colorPalette.whiteColor};
  &:hover {
    background-color: ${colorPalette.selectListHoverColor};
  }
`;

// NoData 컴포넌트의 스타일을 정의
export const NoDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20rem;
  margin-bottom: 3.7rem;
`;

// checkbox 컴포넌트의 스타일을 정의
export const CheckBoxWrapper = styled.div<{ isSelected: boolean }>`
  display: inline-block;
  width: auto;
  border: ${border.basic};
  padding: 0.525rem 1.15rem;
  cursor: pointer;
  border-radius: ${borderRadius.basicRadius};
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  background-color: ${({ isSelected }) =>
    isSelected && `${colorPalette.tagColor}`};
  color: ${({ isSelected }) => isSelected && `${colorPalette.whiteColor}`};
  border: ${({ isSelected }) =>
    isSelected && `1px solid ${colorPalette.tagColor}`};
`;

// Loading 컴포넌트의 스타일을 정의
export const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  & img {
    width: 150px;
    height: 150px;
  }
  & p {
    margin-top: 2.2rem;
    font-size: ${fontSize.NoDataText};
    color: ${colorPalette.lightGrayTextColor};
  }
`;
// Error 컴포넌트의 스타일을 정의
export const ErrorWrapper = styled.div`
  margin-top: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: ${fontSize.NoDataText};
  color: ${colorPalette.grayTextColor};
  & img {
    width: 13.75rem;
    height: 16.063rem;
    margin-bottom: 3.188rem;
  }
  p:first-of-type {
    font-weight: 700;
  }
`;

//BorrowCard
export const BorrowCardContainer = styled.div``;
export const BorrowCardWrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: ${BoxShadow.Basic};
  transform: translateY(4rem);
  height: 11rem;
  width: 23rem;
  margin-bottom: 2rem;
`;
export const ImgWrapper = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  height: 9rem;
  width: 9rem;
  img {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 9rem;
    width: 9rem;
  }
`;
export const ContentWrapper = styled.div``;
export const DatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 4rem;
  width: 10rem;

  font-size: ${fontSize.small};
  color: ${colorPalette.grayTextColor};
  div {
    transform: translateY(1rem);
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  height: 2rem;
  width: 10rem;
  font-weight: 700;
  font-size: ${fontSize.basic};
`;

export const ButtonWapper = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid brown; */
  height: 2rem;
  width: 10rem;

  button {
    width: 4.5rem;
    height: 1.7rem;
    font-weight: lighter;
    font-size: ${fontSize.small};
  }
`;
//LendCard
export const LendCardWrapper = styled.div`
  display: flex;
  align-items: center;
  box-shadow: ${BoxShadow.Basic};
  transform: translateY(4rem);
  height: 11rem;
  width: 23rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

export const LendImgWrapper = styled.div`
  margin-left: 1rem;
  height: 9rem;
  width: 9rem;
  img {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 9rem;
    width: 9rem;
  }
`;
export const LendContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;
export const LendDatesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid gray; */
  height: 4rem;
  width: 10rem;
  font-size: ${fontSize.small};
  color: ${colorPalette.grayTextColor};
`;
export const LendPeriod = styled.p`
  margin-bottom: 0.5rem;
`;
export const LendTitleWrapper = styled.div`
  display: flex;
  /* border: 1px solid black; */
  height: 2rem;
  width: 10rem;
  font-weight: 700;
  font-size: ${fontSize.basic};
`;

export const LendButtonWapper = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid brown; */
  height: 2rem;
  width: 10rem;

  button {
    margin-right: 0.3rem;
    width: 4.5rem;
    height: 1.7rem;
    font-weight: lighter;
    font-size: ${fontSize.small};
  }
`;
