import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';

type LenderInfo = {
  //   chatRoomId: string;
  displayName: string;
  imageUrl: string;
};

const initialState: LenderInfo = {
  //   chatRoomId: '',
  displayName: '',
  imageUrl: '',
};

export const lenderInfo = createSlice({
  name: 'lenderInfoReducer',
  initialState,
  reducers: {
    createLenderInfo: (state, action: PayloadAction<LenderInfo>) => {
      state.displayName = action.payload.displayName;
      state.imageUrl = action.payload.imageUrl;
      console.log('4. store에 저장될 유저 정보:', action.payload);

      // WebSocketManager.connect();
      // console.log('웹소켓 연결이 되었습니다.');
    },
  },
});

export const store = configureStore({ reducer: lenderInfo.reducer });
export const { createLenderInfo } = lenderInfo.actions;
