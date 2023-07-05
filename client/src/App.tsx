import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import Header from './pages/Header/views/Header';
import Footer from './pages/Footer/views/Footer';
import Container from '@mui/material/Container';
import { store } from './common/store/RootStore';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="xs">
        <Header />
        <Provider store={store}>
          <Router />
        </Provider>
        <Footer prop1={'로고'}/>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
