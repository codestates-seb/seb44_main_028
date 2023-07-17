import Days from './Days';
import Dates from './Dates';
import { YearAndMonthWrapper, Month, Table, Year } from '../style';
import { CalendarProps } from '../type';

function Calendar({ calendar, reservationData }: CalendarProps) {
  return (
    <Table>
      <YearAndMonthWrapper>
        <Month>{calendar.month + '월'}</Month>
        <Year>{calendar.year}</Year>
      </YearAndMonthWrapper>
      <Days />
      <Dates calendar={calendar} reservationData={reservationData} />
    </Table>
  );
}

export default Calendar;
