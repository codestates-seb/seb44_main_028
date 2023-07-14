import { useDispatch, useSelector } from 'react-redux';
import Calendar from './Calendar';
import { RootState } from '../../../common/store/RootStore';
import { setDate } from '../store/CalendarStore';
import {
  CalendarContainer,
  Btn,
  ButtonWrapper,
  CalendarWrapper,
} from '../style';
import MonthSwitchBtns from './MonthSwitchBtns';

function Calendars() {
  const current = useSelector((state: RootState) => state.calendar);
  const next =
    current.month === 12
      ? { ...current, year: current.year + 1, month: 1 }
      : { ...current, month: current.month + 1 };

  const reservationData1 = useSelector(
    (state: RootState) => state.monthlyReservation.reservationsDate1,
  );
  const reservationData2 = useSelector(
    (state: RootState) => state.monthlyReservation.reservationsDate2,
  );
  console.log('1번째 달력', reservationData1);
  console.log('2번째 달력', reservationData2);

  return (
    <CalendarContainer>
      <MonthSwitchBtns />
      <CalendarWrapper>
        <Calendar calendar={current} reservationData={reservationData1} />
        <Calendar calendar={next} reservationData={reservationData2} />
      </CalendarWrapper>
    </CalendarContainer>
  );
}
export default Calendars;
