import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userInfo } from './UserInfoStore';

const rootReducer = combineReducers({
  userInfo: userInfo.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});
