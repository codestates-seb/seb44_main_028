import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../model/IUserInfo';

const initialState: { isLoggedIn: boolean; userInfo: IUserInfo | undefined } = {
  isLoggedIn: false,
  userInfo: undefined,
};

export const userInfo = createSlice({
  name: 'userInfoReducer',
  initialState,
  reducers: {
    createUserInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.isLoggedIn = true;
      state.userInfo = { ...action.payload };
    },
    deleteUserInfo: () => {
      return initialState;
    },
  },
});

export const store = configureStore({ reducer: userInfo.reducer });
export const { createUserInfo, deleteUserInfo } = userInfo.actions;
