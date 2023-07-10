import { YearAndMonthWrapper, Month, Table, Year } from '../style';
import Days from './Days';
import Dates from './Dates';
import { CalendarProps } from '../type';

function Calendar({ calendar }: CalendarProps) {
  return (
    <Table>
      <YearAndMonthWrapper>
        <Month>{calendar.month + '월'}</Month>
        <Year>{calendar.year}</Year>
      </YearAndMonthWrapper>
      <Days />
      <Dates calendar={calendar} />
    </Table>
  );
}

export default Calendar;
