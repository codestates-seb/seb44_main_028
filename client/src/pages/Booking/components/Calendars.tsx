import { useDispatch, useSelector } from 'react-redux';
import Calendar from './Calendar';
import { RootState } from '../../../common/store/RootStore';
import {
  CalendarContainer,
  Btn,
  ButtonWrapper,
  CalendarWrapper,
} from '../style';
import MonthSwitchBtns from './MonthSwitchBtns';
import { clearReservationDates } from '../store/ReservationDateStore';

function Calendars() {
  const dispatch = useDispatch();
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

  const handleClearReservation = () => {
    dispatch(clearReservationDates());
  };

  return (
    <CalendarContainer>
      <MonthSwitchBtns />
      <CalendarWrapper>
        <Calendar calendar={current} reservationData={reservationData1} />
        <Calendar calendar={next} reservationData={reservationData2} />
      </CalendarWrapper>
      <button onClick={handleClearReservation}>시작 날짜 재설정</button>
    </CalendarContainer>
  );
}
export default Calendars;
