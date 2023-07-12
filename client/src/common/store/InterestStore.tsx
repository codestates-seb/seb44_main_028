import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { IInterest } from '../model/IInterest';
import { INTEREST_KEY } from '../../pages/Main/constants';
const initialState: IInterest = {
  isHeartClicked: false,
  interest: [],
};
export const interestProducts = createSlice({
  name: 'interestReducer',
  initialState,
  reducers: {
    addInterest: (state, action: PayloadAction<string>) => {
      state.isHeartClicked = true;
      state.interest.push(action.payload);
    },
    removeInterest: (state, action: PayloadAction<string>) => {
      state.isHeartClicked = false;
      state.interest = state.interest.filter((id) => id !== action.payload);
    },
  },
});
export const store = configureStore({ reducer: interestProducts.reducer });
export const { addInterest, removeInterest } = interestProducts.actions;

const initializeStateLocalStorageInterest = () => {
  const interest = localStorage.getItem(INTEREST_KEY);
  if (interest) {
    store.dispatch(interestProducts.actions.addInterest(JSON.parse(interest)));
  }
};
const saveStateToLocalStorageInterest = () => {
  const newInterest = store.getState().interest;
  localStorage.setItem(INTEREST_KEY, JSON.stringify(newInterest));
};
store.subscribe(saveStateToLocalStorageInterest);
initializeStateLocalStorageInterest();
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export default store;
