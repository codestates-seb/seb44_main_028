import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const today = new Date();

type CalendarProps = {
  year: number;
  month: number;
  date: number;
};

const initialCalendarState: CalendarProps = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  date: today.getDate(),
};

export const calendar = createSlice({
  name: 'calendarReducer',
  initialState: initialCalendarState,
  reducers: {
    setDate: (state, action: PayloadAction<CalendarProps>) => {
      state.year = action.payload.year;
      state.month = action.payload.month;
      state.date = action.payload.date;
    },
  },
});

export const calendarStore = configureStore({ reducer: calendar.reducer });
export const { setDate } = calendar.actions;
