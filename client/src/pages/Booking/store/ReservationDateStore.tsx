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
      const newStart = action.payload.startDate;
      if (!newStart || !newStart.date) return;

      const newStartYear = newStart.year;
      const newStartMonth = newStart.month;
      const newStartDate = newStart.date;

      const today = new Date();
      const todaysYear = today.getFullYear();
      const todaysMonth = today.getMonth() + 1;
      const todaysDate = today.getDate();

      if (
        newStartYear > todaysYear ||
        (newStartYear === todaysYear && newStartMonth > todaysMonth) ||
        (newStartYear === todaysYear &&
          newStartMonth === todaysMonth &&
          newStartDate >= todaysDate)
      ) {
        state.startDate = newStart;
      }
    },
    setEndDate: (state, action: PayloadAction<ReservationProps>) => {
      const newEnd = action.payload.endDate;
      if (!newEnd || !newEnd.date) return;

      const newEndYear = newEnd.year;
      const newEndMonth = newEnd.month;
      const newEndDate = newEnd.date;

      const currentStart = state.startDate;
      if (!currentStart) return;
      const currentStartYear = currentStart.year;
      const currentStartMonth = currentStart.month;
      const currentStartDate = currentStart.date;

      if (
        currentStartYear < newEndYear ||
        (currentStartYear === newEndYear && currentStartMonth < newEndMonth) ||
        (currentStartYear === newEndYear &&
          currentStartMonth === newEndMonth &&
          currentStartDate <= newEndDate)
      ) {
        state.endDate = newEnd;
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
