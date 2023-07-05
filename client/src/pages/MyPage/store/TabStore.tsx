import { configureStore, createSlice } from '@reduxjs/toolkit';

export const tabSlice = createSlice({
  name: 'tab',
  initialState: 'Profile',
  reducers: {
    setTab: (_state, action) => {
      return action.payload;
    },
  },
});

export const store = configureStore({
  reducer: tabSlice.reducer,
});

export const { setTab } = tabSlice.actions;
