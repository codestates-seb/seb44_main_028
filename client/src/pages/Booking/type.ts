export type CalendarProps = {
  calendar: {
    year: number;
    month: number;
    date: number;
  };
};

export type EachDatesProps = {
  current: {
    year: number;
    month: number;
    date: number;
  };
  row: {
    week: number;
    finalWeek: number;
  };
  day: number;
};
