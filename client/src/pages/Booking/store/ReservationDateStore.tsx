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
      state.startDate = action.payload.startDate;
    },
    setEndDate: (state, action: PayloadAction<ReservationProps>) => {
      if (
        state.startDate &&
        action.payload.endDate &&
        state.startDate.year <= action.payload.endDate?.year &&
        state.startDate.month <= action.payload.endDate?.month &&
        state.startDate.date <= action.payload.endDate?.date
      ) {
        state.endDate = action.payload.endDate;
      } else {
        return;
      }
      console.log('상태', state);
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
