import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import Header from './pages/Header/views/Header';
import Container from '@mui/material/Container';
import { store } from './common/store/RootStore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ImageCarousel from './pages/Detail/components/ImageCarousel';
import { IMAGE_SLIDER } from './pages/Main/constants';
import { MainImageCarousel } from './pages/Main/style';
import { ErrorBoundary } from 'react-error-boundary';
import Fallback from './common/components/Fallback';

function App() {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <MainImageCarousel>
                      <ImageCarousel images={IMAGE_SLIDER} size="large" />
                    </MainImageCarousel>
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
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
