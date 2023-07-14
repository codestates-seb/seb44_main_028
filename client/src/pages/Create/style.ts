import styled from 'styled-components';
import { border } from '../../common/utils/enum/border';
import { borderRadius } from '../../common/utils/enum/borderRadius';
import { colorPalette } from '../../common/utils/enum/colorPalette';
import { fontSize } from '../../common/utils/enum/fontSize';

export const CreatePageContainer = styled.div`
  font-size: ${fontSize.headerIconSize};
  margin-top: 4.125rem;
`;
export const UploadContainer = styled.div`
  display: flex;
  margin: 1.875rem 0;
`;
export const UploadImageLabel = styled.label`
  margin-top: 1rem;
  width: 9.875rem;
  height: 7.875rem;
  border: ${border.basic};
  border-radius: ${borderRadius.basicRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colorPalette.CaemeraIconColor};
  margin-right: 1rem;
  cursor: pointer;
  & svg {
    width: 2.563rem;
    height: 2.313rem;
    transform: translateY(0.2rem);
  }
`;
export const UploadImageWrapper = styled.input`
  display: none;
`;
export const UploadImageCountWrapper = styled.div`
  & span:first-child {
    color: ${colorPalette.accentColor};
    font-weight: bold;
  }
`;
export const PreImageWrapper = styled.div`
  & img {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: ${borderRadius.basicRadius};
  }
  position: relative;
  width: 9.875rem;
  height: 7.875rem;
  margin: 0 1rem;
  border: ${border.basic};
  border-radius: ${borderRadius.basicRadius};
`;
export const PreViewImageWrapper = styled.div`
  & .closeIcon {
    background-color: ${colorPalette.whiteColor};
    color: ${colorPalette.basicTextColor};
    border-radius: 50%;
    border: ${border.basic};
    cursor: pointer;
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    right: -0.5rem;
    top: -0.5rem;
  }
`;
export const WritePostContainer = styled.form`
  display: flex;
  flex-direction: column;
  & .ql-snow:first-child {
    margin-top: 0.75rem;
    border-top-right-radius: ${borderRadius.basicRadius};
    border-top-left-radius: ${borderRadius.basicRadius};
  }
  & .ql-snow:last-child {
    border-bottom-right-radius: ${borderRadius.basicRadius};
    border-bottom-left-radius: ${borderRadius.basicRadius};
    height: 25.25rem;
    margin-bottom: 5rem;
    font-size: ${fontSize.headerIconSize};
  }
  & input {
    padding: 0.8rem;
    border: ${border.basic};
    border-radius: ${borderRadius.basicRadius};
    margin-top: 0.75rem;
    color: ${colorPalette.grayTextColor};
  }

  & small {
    margin-top: 0.5rem;
    color: ${colorPalette.basicTextColor};
    font-size: ${fontSize.small};
  }
`;
export const WritePriceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1.875rem;
  gap: 2rem;
  margin-bottom: 2.875rem;
`;
export const PriceInput = styled.div<{ isInputChange: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  input:focus {
    outline: none !important;
    border-color: ${({ isInputChange }) =>
      isInputChange
        ? `${colorPalette.checkColor}`
        : `${colorPalette.errorColor}`};
    box-shadow: ${({ isInputChange }) =>
      isInputChange
        ? `0 0 3px ${colorPalette.checkColor}`
        : `0 0 3px ${colorPalette.errorColor}`};
  }
  svg {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 0.7rem;
    bottom: 0.6rem;
    color: ${({ isInputChange }) =>
      isInputChange
        ? `${colorPalette.checkColor}`
        : `${colorPalette.errorColor}`};
  }
`;
export const TitleInput = styled.div<{ isInputChange: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  input:focus {
    outline: none !important;
    border-color: ${({ isInputChange }) =>
      isInputChange
        ? `${colorPalette.checkColor}`
        : `${colorPalette.errorColor}`};
    box-shadow: ${({ isInputChange }) =>
      isInputChange
        ? `0 0 3px ${colorPalette.checkColor}`
        : `0 0 3px ${colorPalette.errorColor}`};
  }
  svg {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 0.7rem;
    bottom: 0.6rem;
    color: ${({ isInputChange }) =>
      isInputChange
        ? `${colorPalette.checkColor}`
        : `${colorPalette.errorColor}`};
  }
`;

export const CheckBoxTitle = styled.div`
  margin-bottom: 1.5rem;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4rem;
  & button {
    font-size: ${fontSize.headerIconSize};
    width: 10.938rem;
    height: 3.563rem;
    margin: 0 1rem;
    margin-top: 5rem;
    border-radius: ${borderRadius.basicRadius};
    border: none;
    cursor: pointer;
  }
  & button:first-child {
    background-color: ${colorPalette.modalCancelButtonColor};
    color: 'inherit';
  }
  & button:first-child:hover {
    background-color: ${colorPalette.modalCancelHoverColor};
  }
  & button:last-child {
    background-color: ${colorPalette.heavyColor};
    color: ${colorPalette.whiteColor};
  }
  & button:last-child:hover {
    background-color: ${colorPalette.rightButtonHoverColor};
  }
`;
