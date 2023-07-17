import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userInfo } from './UserInfoStore';
import { calendar } from '../../pages/Booking/store/CalendarStore';
import { reservation } from '../../pages/Booking/store/ReservationDateStore';
import { interestProducts } from './InterestStore';
import { monthlyReservation } from '../../pages/Booking/store/MonthlyReservationStore';
import { mypageProfileSlice } from '../../pages/MyPage/store/ProfileSlice';

const rootReducer = combineReducers({
  userInfo: userInfo.reducer,
  calendar: calendar.reducer,
  reservation: reservation.reducer,
  interestProducts: interestProducts.reducer,
  monthlyReservation: monthlyReservation.reducer,
  mypageProfileSlice: mypageProfileSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
