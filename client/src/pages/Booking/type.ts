export type CalendarProps = {
  calendar: {
    year: number;
    month: number;
    date: number;
  };
};

export type EachDatesProps = {
  today: {
    year: number;
    month: number;
    date: number;
  };
  row: {
    week: number;
    lastWeek: number;
  };
  day: number;
};
