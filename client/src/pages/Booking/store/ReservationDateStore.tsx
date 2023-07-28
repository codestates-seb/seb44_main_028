import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StartEndDateProps } from '../model/IStartEndDateProps';
import { DateType } from '../type';
import { isWithinPeriod } from '../../../common/utils/helperFunctions/isWithinPeriod';

type ReservationProps = {
  startDate: DateType | null;
  endDate: DateType | null;
  allReservations: StartEndDateProps[];
};

const initialReservationState: ReservationProps = {
  startDate: null,
  endDate: null,
  allReservations: [],
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

      const allReservations = action.payload.allReservations;

      for (const reservation of allReservations) {
        if (
          state.endDate &&
          isWithinPeriod(newStart, state.endDate, reservation)
        ) {
          alert(
            '선택하신 기간에는 이미 예약이 있습니다. 다른 기간을 선택해 주세요.',
          );
          return;
        }
      }

      if (
        new Date(newStartYear, newStartMonth - 1, newStartDate) >=
        new Date(todaysYear, todaysMonth - 1, todaysDate)
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

      const allReservations = action.payload.allReservations;

      for (const reservation of allReservations) {
        if (isWithinPeriod(currentStart, newEnd, reservation)) {
          alert(
            '선택하신 기간에는 이미 예약이 있습니다. 다른 기간을 선택해 주세요.',
          );
          return;
        }
      }

      if (
        new Date(currentStartYear, currentStartMonth - 1, currentStartDate) <=
        new Date(newEndYear, newEndMonth - 1, newEndDate)
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
export const { setStartDate, setEndDate, clearReservationDates } =
  reservation.actions;
