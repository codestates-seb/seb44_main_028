import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type ReservationProps = {
  startDate: { year: number; month: number; date: number } | null;
  endDate: { year: number; month: number; date: number } | null;
};

const initialReservationState: ReservationProps = {
  startDate: null,
  endDate: null,
};

export const reservation = createSlice({
  name: 'reservationReducer',
  initialState: initialReservationState,
  reducers: {
    setStartDate: (state, action: PayloadAction<ReservationProps>) => {
      const today = new Date();
      if (
        action.payload.startDate &&
        action.payload.startDate?.year >= today.getFullYear() &&
        action.payload.startDate?.month >= today.getMonth() + 1 &&
        action.payload.startDate?.date >= today.getDate()
      ) {
        state.startDate = action.payload.startDate;
      } else {
        return;
      }
    },
    setEndDate: (state, action: PayloadAction<ReservationProps>) => {
      if (
        state.startDate &&
        action.payload.endDate &&
        (state.startDate.year < action.payload.endDate?.year ||
          (state.startDate.year === action.payload.endDate?.year &&
            state.startDate.month < action.payload.endDate?.month) ||
          (state.startDate.year === action.payload.endDate?.year &&
            state.startDate.month === action.payload.endDate?.month &&
            state.startDate.date <= action.payload.endDate?.date))
      ) {
        state.endDate = action.payload.endDate;
      } else {
        return;
      }
    },
    clearReservationDates: () => {
      return initialReservationState;
    },
  },
});

export const reservationStore = configureStore({
  reducer: reservation.reducer,
});
export const { setStartDate, setEndDate } = reservation.actions;
