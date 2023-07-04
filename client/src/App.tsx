import React from 'react';
import { GlobalStyle } from './common/style/GlobalStyle';
import Router from './Router';
import Header from './pages/Header/views/Header';
import Footer from './pages/Footer/views/Footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Router />
      <Footer />
    </>
  );
}

export default App;
