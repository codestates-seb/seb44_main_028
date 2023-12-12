import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootReducer } from '../../../common/store/RootStore';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../views/Header';

const store = configureStore({
  reducer: rootReducer,
});
describe('Header', () => {
  test('로고 클릭하면 메인 페이지로 이동', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );
    const LogoWrapper = screen.getByTestId('logo');
    const link = LogoWrapper.querySelector('a');
    expect(link).toHaveAttribute('href', '/');
  });
  ``;
  test('마이페이지 클릭하면 마이 페이지로 이동', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );
    const myPage = screen.getByTestId('list');
    const link = myPage.querySelector('a');
    expect(link).toHaveAttribute('href', '/mypage');
  });
  test('글 작성하기 클릭하면 마이 페이지로 이동', () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );

    const links = screen.getAllByRole('listitem');
    const link1 = links[0].querySelector('a');
    const link2 = links[1].querySelector('a');
    expect(link1).toHaveAttribute('href', '/mypage');
    expect(link2).toHaveAttribute('href', '/create');
  });
});
