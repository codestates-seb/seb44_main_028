import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import Header from './pages/Header/views/Header';
import Footer from './pages/Footer/views/Footer';
import Container from '@mui/material/Container';
import { store } from './common/store/RootStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Carousel from './pages/Main/components/Carousel';
import { WebSocketProvider } from './WebSocketProvider';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <WebSocketProvider>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Carousel />
                    <Container maxWidth="lg">
                      <Router />
                    </Container>
                  </>
                }
              />
              <Route
                path="/*"
                element={
                  <Container maxWidth="lg" style={{ paddingTop: '4.5rem' }}>
                    <Router />
                  </Container>
                }
              />
            </Routes>
            {/* <Footer prop1={'플레이 팩'} /> */}
          </WebSocketProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
