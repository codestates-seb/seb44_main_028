import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "PretendardVariable";
  src: url("/fonts/PretendardVariable.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'PretendardVariable', sans-serif;
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
