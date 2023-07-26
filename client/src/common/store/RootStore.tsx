import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userInfo } from './UserInfoStore';
import { calendar } from '../../pages/Booking/store/CalendarStore';
import { reservation } from '../../pages/Booking/store/ReservationDateStore';
import { monthlyReservation } from '../../pages/Booking/store/MonthlyReservationStore';
import { mypageProfileSlice } from '../../pages/MyPage/store/ProfileSlice';
import { lenderInfo } from '../../pages/Detail/store/CurrentLenderInfo';

export const rootReducer = combineReducers({
  userInfo: userInfo.reducer,
  calendar: calendar.reducer,
  reservation: reservation.reducer,
  monthlyReservation: monthlyReservation.reducer,
  mypageProfileSlice: mypageProfileSlice.reducer,
  lenderInfo: lenderInfo.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
