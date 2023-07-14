import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

export const mypageProfileSlice = createSlice({
  name: 'mypageProfile',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = mypageProfileSlice.actions;
export default mypageProfileSlice.reducer;
