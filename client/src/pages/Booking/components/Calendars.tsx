import { useDispatch, useSelector } from 'react-redux';
import Calendar from './Calendar';
import MonthSwitchBtns from './MonthSwitchBtns';
import { clearReservationDates } from '../store/ReservationDateStore';
import { CalendarContainer, CalendarWrapper } from '../style';
import { RootState } from '../../../common/store/RootStore';

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

  const handleClearReservation = () => {
    dispatch(clearReservationDates());
  };

  return (
    <CalendarContainer>
      <MonthSwitchBtns />
      <CalendarWrapper>
        <Calendar
          calendar={current}
          reservationDataFromServer={reservationData1}
        />
        <Calendar
          calendar={next}
          reservationDataFromServer={reservationData2}
        />
      </CalendarWrapper>
    </CalendarContainer>
  );
}
export default Calendars;
