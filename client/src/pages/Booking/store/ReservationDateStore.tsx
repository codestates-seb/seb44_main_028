import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StartEndDateProps } from '../model/IStartEndDateProps';
import { DateType } from '../type';

function isWithinPeriod(
  startDate: DateType,
  endDate: DateType,
  reservation: StartEndDateProps,
) {
  const start = new Date(startDate.year, startDate.month - 1, startDate.date);
  const end = new Date(endDate.year, endDate.month - 1, endDate.date);

  const reservationStart = new Date(
    reservation.startDate.year,
    reservation.startDate.month - 1,
    reservation.startDate.date,
  );
  const reservationEnd = new Date(
    reservation.endDate.year,
    reservation.endDate.month - 1,
    reservation.endDate.date,
  );

  // 시작 날짜와 종료 날짜가 예약 기간 안에 있는지 확인
  if (start >= reservationStart && start <= reservationEnd) return true;
  if (end >= reservationStart && end <= reservationEnd) return true;

  // 예약이 시작 날짜와 종료 날짜 사이에 있는지 확인
  if (reservationStart >= start && reservationStart <= end) return true;
  if (reservationEnd >= start && reservationEnd <= end) return true;

  return false;
}

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
      console.log('allReservations', allReservations);

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
export const { setStartDate, setEndDate, clearReservationDates } =
  reservation.actions;
