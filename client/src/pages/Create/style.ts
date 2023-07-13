import styled from 'styled-components';
import { border } from '../../common/utils/enum/border';
import { borderRadius } from '../../common/utils/enum/borderRadius';
import { colorPalette } from '../../common/utils/enum/colorPalette';
import { fontSize } from '../../common/utils/enum/fontSize';
import { INPUT_FIELD_TITLE } from './constants';

export const CreatePageContainer = styled.div`
  font-size: ${fontSize.headerIconSize};
  margin-top: 4.125rem;
`;
export const UploadContainer = styled.div`
  display: flex;
  margin: 1.875rem 0;
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
`;
export const InputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3.875rem;
  & input {
    padding: 0.8rem;
    border: ${border.basic};
    border-radius: ${borderRadius.basicRadius};
    margin-top: 0.75rem;
    color: ${colorPalette.grayTextColor};
  }
  & input:not([id='${INPUT_FIELD_TITLE[0].id}']) {
    text-align: end;
  }
`;
export const WritePriceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 1.875rem;
  gap: 2rem;
`;
