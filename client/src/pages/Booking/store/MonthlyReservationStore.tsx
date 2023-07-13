import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StartEndDateProps {
  startDate: string;
  endDate: string;
}

interface MonthlyReservationProps {
  productTitle: string;
  baseFee: number;
  feePerDay: number;
  minimumRentalPeriod: number;
  reservationsDate1: StartEndDateProps[];
  reservationsDate2: StartEndDateProps[];
}

const initialMonthlyReservationState: MonthlyReservationProps = {
  productTitle: '제목',
  baseFee: 100,
  feePerDay: 10,
  minimumRentalPeriod: 3,
  reservationsDate1: [
    {
      startDate: '2023-02-03',
      endDate: '2023-02-06',
    },
    {
      startDate: '2023-02-07',
      endDate: '2023-02-13',
    },
  ],
  reservationsDate2: [
    {
      startDate: '2023-02-03',
      endDate: '2023-02-06',
    },
    {
      startDate: '2023-02-07',
      endDate: '2023-02-13',
    },
  ],
};

export const monthlyReservation = createSlice({
  name: 'monthlyReservationReducer',
  initialState: initialMonthlyReservationState,
  reducers: {
    setMonthlyReservation: (
      state,
      action: PayloadAction<MonthlyReservationProps>,
    ) => {
      state.productTitle = action.payload.productTitle;
      state.baseFee = action.payload.baseFee;
      state.feePerDay = action.payload.feePerDay;
      state.minimumRentalPeriod = action.payload.minimumRentalPeriod;
      state.reservationsDate1 = action.payload.reservationsDate1;
      state.reservationsDate2 = action.payload.reservationsDate2;
    },
  },
});

export const monthlyReservationStore = configureStore({
  reducer: monthlyReservation.reducer,
});
export const { setMonthlyReservation } = monthlyReservation.actions;
