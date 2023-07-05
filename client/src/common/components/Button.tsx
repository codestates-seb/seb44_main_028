import React from 'react';
import styled from 'styled-components';

function Button() {
  return <DefaultBtn>Button</DefaultBtn>;
}
export default Button;

const DefaultBtn = styled.button`
  background-color: #0d4c92;
  color: #fff;
  height: 32px;
  width: 100px;
  border-radius: 10px;
  border: none;
  box-shadow: 1px 1px 1px 1px #888;
  &:hover {
    background-color: #1d5799;
  }
  /* &:active {
    transform: scale(0.98);
  } */
`;
