import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ol{
    padding: 0;
  }
  li{
    list-style: none;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
