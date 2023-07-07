import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userInfo } from './UserInfoStore';
import { calendar } from '../../pages/Booking/store/CalendarStore';

const rootReducer = combineReducers({
  userInfo: userInfo.reducer,
  calendar: calendar.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
