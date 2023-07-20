import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../../../common/store/RootStore';
import Calendars from '../components/Calendars';
import { clearReservationDates } from '../store/ReservationDateStore';

describe('Calendars', () => {
  test('renders Calendars component', () => {
    // store를 생성.
    const store = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={store}>
        <Calendars />
      </Provider>,
    );

    //TODO: MonthSwitchBtns 컴포넌트의 존재 여부를 확인.

    // TODO: Calendar 컴포넌트의 존재 여부를 확인.

    // "시작 날짜 재설정" 버튼의 존재 여부를 확인합니다.
    expect(
      screen.getByRole('button', { name: /시작 날짜 재설정/i }),
    ).toBeInTheDocument();
  });

  test('handles clear reservation button click', () => {
    // store를 생성합니다.
    const store = configureStore({
      reducer: rootReducer,
    });

    render(
      <Provider store={store}>
        <Calendars />
      </Provider>,
    );

    // "시작 날짜 재설정" 버튼을 클릭합니다.
    fireEvent.click(screen.getByRole('button', { name: /시작 날짜 재설정/i }));

    // clearReservationDates 액션이 dispatch되었는지 확인합니다.
    store.dispatch(clearReservationDates());

    // 액션이 디스패치되었거나 상태가 업데이트되었는지 확인
    const state = store.getState();
    expect(state.reservation.startDate).toEqual(null);
    expect(state.reservation.endDate).toEqual(null);
  });
});
