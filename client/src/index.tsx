import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from '../src/common/style/GlobalStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
);
