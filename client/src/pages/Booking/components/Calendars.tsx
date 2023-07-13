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

  return (
    <CalendarContainer>
      <MonthSwitchBtns />
      <CalendarWrapper>
        <Calendar calendar={current} />
        <Calendar calendar={next} />
      </CalendarWrapper>
    </CalendarContainer>
  );
}
export default Calendars;
