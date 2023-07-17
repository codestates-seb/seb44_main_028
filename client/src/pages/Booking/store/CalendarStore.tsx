import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateType } from '../type';

const today = new Date();

type CalendarProps = {
  year: number;
  month: number;
  date: number;
};

const initialCalendarState: DateType = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  date: today.getDate(),
};

export const calendar = createSlice({
  name: 'calendarReducer',
  initialState: initialCalendarState,
  reducers: {
    setDate: (state, action: PayloadAction<DateType>) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.date = action.payload.date;
      console.log(state);
    },
  },
});

export const calendarStore = configureStore({ reducer: calendar.reducer });
export const { setDate } = calendar.actions;
