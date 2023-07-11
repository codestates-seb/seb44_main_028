import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { setDate } from '../store/CalendarStore';
import { Btn, ButtonWrapper } from '../style';
import axios from 'axios';

function MonthSwitchBtns() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.calendar);
  const { itemId } = useParams<{ itemId: string }>();
  console.log('현재 날짜', current);

  const onClickBack = () => {
    if (current.month > 1) {
      dispatch(setDate({ ...current, month: current.month - 1 }));
    } else {
      dispatch(setDate({ ...current, year: current.year - 1, month: 12 }));
    }
    // const response = axios.get(
    //   `https://playpack.shop/api/reservations/products/api/reservations/products/${itemId}/moreCalendar?date=${current.year}-${current.month}-${current.date}`,
    // );
    // console.log(response);
    // console.log('현재 날짜', current);
    console.log(
      '왼쪽 버튼 누를 때 요청할 지난 달',
      current.month === 1 ? current.year - 1 : current.year,
      current.month === 1 ? 12 : current.month - 1,
    );
  };

  const onClickNext = () => {
    if (current.month < 12) {
      dispatch(setDate({ ...current, month: current.month + 1 }));
    } else {
      dispatch(setDate({ ...current, year: current.year + 1, month: 1 }));
    }

    // const response = axios.get(
    //   `https://playpack.shop/api/reservations/products/api/reservations/products/${itemId}/moreCalendar?date=2023-01-01`,
    // );
    // console.log(response);
    console.log(
      '오른쪽 버튼 누를 때 요청할 다음 달',
      current.month === 11 || current.month === 12
        ? current.year + 1
        : current.year,
      current.month === 11 || current.month === 12
        ? current.month - 10
        : current.month + 2,
    );
  };

  return (
    <ButtonWrapper>
      <Btn onClick={onClickBack}>◀️</Btn>
      <Btn onClick={onClickNext}>▶️</Btn>
    </ButtonWrapper>
  );
}
export default MonthSwitchBtns;
