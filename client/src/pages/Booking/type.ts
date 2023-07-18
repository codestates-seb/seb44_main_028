import { StartEndDateProps } from './model/IStartEndDateProps';

export type DateType = {
  year: number;
  month: number;
  date: number;
};

export type CalendarProps = {
  calendar: DateType;
  reservationDataFromServer: StartEndDateProps[];
};

export type EachDatesProps = {
  current: DateType;
  row: {
    week: number;
    finalWeek: number;
  };
  reservationDataFromServer: StartEndDateProps[];
  day: number;
};
