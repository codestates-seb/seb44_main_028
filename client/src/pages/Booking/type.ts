import { StartEndDateProps } from './model/IStartEndDateProps';

export type DateType = {
  year: number;
  month: number;
  date: number;
};

export type CalendarProps = {
  calendar: DateType;
  reservationData: StartEndDateProps[];
};

export type EachDatesProps = {
  current: DateType;
  row: {
    week: number;
    finalWeek: number;
  };
  reservationData: StartEndDateProps[];
  day: number;
};
