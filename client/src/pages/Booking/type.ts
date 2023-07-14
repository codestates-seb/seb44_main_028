import { StartEndDateProps } from './model/IStartEndDateProps';

export type CalendarProps = {
  calendar: {
    year: number;
    month: number;
    date: number;
  };
  reservationData: StartEndDateProps[];
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
  reservationData: StartEndDateProps[];
  day: number;
};
