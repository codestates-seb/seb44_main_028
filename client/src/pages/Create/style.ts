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
  margin-top: 3rem;
`;
export const UploadImageLabel = styled.label`
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

  & small {
    margin-top: 0.5rem;
    color: ${colorPalette.basicTextColor};
    font-size: ${fontSize.small};
  }
  & .error-message {
    margin-top: 0.5rem;
    color: ${colorPalette.basicTextColor};
    font-size: ${fontSize.small};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  & .error-message.show {
    opacity: 1;
    position: relative;
  }
`;
export const WritePriceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 1.875rem;
  gap: 2rem;
  margin-bottom: 2.875rem;
`;
export const PriceInput = styled.label<{
  errorMessage: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  input:focus {
    outline: none !important;
  }
  svg {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    right: 0.7rem;
    bottom: ${({ errorMessage }) => (errorMessage ? '0.6rem' : '2rem')};
    top: ${({ errorMessage }) => (errorMessage ? '2.6rem' : '0.6rem')};
    transition: bottom 0.3s ease;
  }
  & .error-icon {
    color: ${colorPalette.errorColor};
  }
  & .check-icon {
    color: ${colorPalette.checkColor};
  }
`;
export const Input = styled.input`
  padding: 0.8rem;
  border: ${border.basic};
  border-radius: ${borderRadius.basicRadius};
  margin-top: 0.75rem;
  color: ${colorPalette.grayTextColor};
  &.error {
    border-color: ${colorPalette.errorColor};
    box-shadow: 0 0 3px ${colorPalette.errorColor};
  }
  &.success {
    border-color: ${colorPalette.checkColor};
    box-shadow: 0 0 3px ${colorPalette.checkColor};
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
