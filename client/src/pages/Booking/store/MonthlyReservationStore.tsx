import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMonthlyReservation } from '../model/IMonthlyReservation';
import { turnStringArrIntoDateObjectArr } from '../../../common/utils/helperFunctions/turnStringArrIntoDateObjectArr';

const initialMonthlyReservationState: IMonthlyReservation = {
  productTitle: '제목',
  baseFee: 100,
  feePerDay: 10,
  minimumRentalPeriod: 3,
  reservationsDate1: [],
  reservationsDate2: [],
};

export const monthlyReservation = createSlice({
  name: 'monthlyReservationReducer',
  initialState: initialMonthlyReservationState,
  reducers: {
    setMonthlyReservation: (
      state,
      action: PayloadAction<IMonthlyReservation>,
    ) => {
      console.log('예약 정보', action.payload);
      state.productTitle = action.payload.productTitle;
      state.baseFee = action.payload.baseFee;
      state.feePerDay = action.payload.feePerDay;
      state.minimumRentalPeriod = action.payload.minimumRentalPeriod;
      state.reservationsDate1 = action.payload.reservationsDate1;
      state.reservationsDate2 = action.payload.reservationsDate2;
    },
    clickRightArrow: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }[]>,
    ) => {
      state.reservationsDate1 = state.reservationsDate2;
      state.reservationsDate2 = turnStringArrIntoDateObjectArr(action.payload);
    },
    clickLeftArrow: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }[]>,
    ) => {
      state.reservationsDate2 = state.reservationsDate1;
      state.reservationsDate1 = turnStringArrIntoDateObjectArr(action.payload);
    },
  },
});

export const monthlyReservationStore = configureStore({
  reducer: monthlyReservation.reducer,
});
export const { setMonthlyReservation, clickLeftArrow, clickRightArrow } =
  monthlyReservation.actions;
