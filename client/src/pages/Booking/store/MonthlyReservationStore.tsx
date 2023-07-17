import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StartEndDateProps } from '../model/IStartEndDateProps';

const turnStringArrIntoDateObjectArr = (
  date: { startDate: string; endDate: string }[],
) => {
  const dateObjectArr = date.map(
    (dateObj: { startDate: string; endDate: string }) => {
      const startDate = {
        year: Number(dateObj.startDate.slice(0, 4)),
        month: Number(dateObj.startDate.slice(5, 7)),
        day: Number(dateObj.startDate.slice(8, 10)),
      };
      const endDate = {
        year: Number(dateObj.endDate.slice(0, 4)),
        month: Number(dateObj.endDate.slice(5, 7)),
        day: Number(dateObj.endDate.slice(8, 10)),
      };
      return { startDate, endDate };
    },
  );
  return dateObjectArr;
};

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
      startDate: {
        year: 2023,
        month: 7,
        day: 15,
      },
      endDate: {
        year: 2023,
        month: 7,
        day: 20,
      },
    },
    {
      startDate: {
        year: 2023,
        month: 7,
        day: 22,
      },
      endDate: {
        year: 2023,
        month: 7,
        day: 29,
      },
    },
  ],
  reservationsDate2: [
    {
      startDate: {
        year: 2023,
        month: 8,
        day: 2,
      },
      endDate: {
        year: 2023,
        month: 8,
        day: 9,
      },
    },
    {
      startDate: {
        year: 2023,
        month: 8,
        day: 22,
      },
      endDate: {
        year: 2023,
        month: 9,
        day: 1,
      },
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
      state.reservationsDate1 = turnStringArrIntoDateObjectArr(action.payload);
      state.reservationsDate2 = state.reservationsDate1;
    },
  },
});

export const monthlyReservationStore = configureStore({
  reducer: monthlyReservation.reducer,
});
export const { setMonthlyReservation, clickLeftArrow, clickRightArrow } =
  monthlyReservation.actions;
