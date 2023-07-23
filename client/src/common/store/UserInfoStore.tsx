import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../model/IUserInfo';
import { ACCESS_TOKEN } from '../constants';
import WebSocketManager from './webSocketManager';

const initialState: {
  isLoggedIn: boolean;
  userInfo: IUserInfo | undefined;
} = {
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
      console.log('4. store에 저장될 유저 정보:', action.payload);
      console.log('5. login 되었습니까?', state.isLoggedIn);

      // WebSocketManager.connect();
      // console.log('웹소켓 연결이 되었습니다.');
    },
    deleteUserInfo: (state) => {
      localStorage.removeItem(ACCESS_TOKEN);

      // WebSocketManager.disconnect();
      return initialState;
    },
  },
});

export const store = configureStore({ reducer: userInfo.reducer });
export const { createUserInfo, deleteUserInfo } = userInfo.actions;
