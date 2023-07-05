import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

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
`;
export default GlobalStyle;
