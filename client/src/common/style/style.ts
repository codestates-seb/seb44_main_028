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
