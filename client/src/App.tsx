import React from 'react';
import Router from './Router';
import Header from './pages/Header/views/Header';
import Footer from './pages/Footer/views/Footer';

function App() {
  return (
    <>
      <Header />
      <span>아이우에오</span>
      <Router />
      <Footer />
    </>
  );
}

export default App;
