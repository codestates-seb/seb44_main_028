import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../../common/store/RootStore';
import BookingDates from '../components/BookingDates';

describe('BookingDates', () => {
  test('renders BookingDates component', () => {
    // store를 생성.
    const store = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={store}>
        <BookingDates />
      </Provider>,
    );

    expect(screen.getByText(/예약 시작 날짜/i)).toBeInTheDocument();
    expect(screen.getByText(/예약 마감 날짜/i)).toBeInTheDocument();
  });
});
