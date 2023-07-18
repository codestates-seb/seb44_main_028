import Days from './Days';
import Dates from './Dates';
import { YearAndMonthWrapper, Month, Table, Year } from '../style';
import { CalendarProps } from '../type';

function Calendar({ calendar, reservationDataFromServer }: CalendarProps) {
  return (
    <Table>
      <YearAndMonthWrapper>
        <Month>{calendar.month + '월'}</Month>
        <Year>{calendar.year}</Year>
      </YearAndMonthWrapper>
      <Days />
      <Dates
        calendar={calendar}
        reservationDataFromServer={reservationDataFromServer}
      />
    </Table>
  );
}

export default Calendar;
