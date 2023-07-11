import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { setDate } from '../store/CalendarStore';
import { Btn, ButtonWrapper } from '../style';

function MonthSwitchBtns() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.calendar);

  const onClickBack = () => {
    if (current.month > 1) {
      dispatch(setDate({ ...current, month: current.month - 1 }));
    } else {
      dispatch(setDate({ ...current, year: current.year - 1, month: 12 }));
    }
  };

  const onClickNext = () => {
    if (current.month < 12) {
      dispatch(setDate({ ...current, month: current.month + 1 }));
    } else {
      dispatch(setDate({ ...current, year: current.year + 1, month: 1 }));
    }
  };

  return (
    <ButtonWrapper>
      <Btn onClick={onClickBack}>◀️</Btn>
      <Btn onClick={onClickNext}>▶️</Btn>
    </ButtonWrapper>
  );
}
export default MonthSwitchBtns;
