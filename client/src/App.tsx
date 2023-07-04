import React from 'react';
import Router from './Router';
import Header from './pages/Header/views/Header';
import Footer from './pages/Footer/views/Footer';

import Container from '@mui/material/Container';

function App() {
  return (
    <>
      <Container maxWidth="xs">
        <Header />
        <Router />
        <Footer />
      </Container>
    </>
  );
}

export default App;
