import styled from 'styled-components';

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
