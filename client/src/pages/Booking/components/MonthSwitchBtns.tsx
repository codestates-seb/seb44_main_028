import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { setDate } from '../store/CalendarStore';
import { Btn, ButtonWrapper } from '../style';
import axios from 'axios';
import {
  clickLeftArrow,
  clickRightArrow,
} from '../store/MonthlyReservationStore';
import { ACCESS_TOKEN } from '../../Login/constants';

function MonthSwitchBtns() {
  const dispatch = useDispatch();
  const current = useSelector((state: RootState) => state.calendar);
  const { itemId } = useParams<{ itemId: string }>();
  console.log('현재 날짜', current);
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = encryptedAccessToken || '';

  const onClickBack = () => {
    if (current.month > 1) {
      dispatch(setDate({ ...current, month: current.month - 1 }));
    } else {
      dispatch(setDate({ ...current, year: current.year - 1, month: 12 }));
    }
    const getPrevMonthReservation = () => {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/api/reservations/products/${itemId}/moreCalendar?date=${
              current.month === 1 ? current.year - 1 : current.year
            }-${
              current.month === 1
                ? 12
                : (current.month - 1).toString().padStart(2, '0')
            }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          console.log('지난 달 예약 배열', res.data);

          dispatch(clickLeftArrow(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPrevMonthReservation();
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
    const getNextMonthReservation = () => {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            `/api/reservations/products/${itemId}/moreCalendar?date=${
              current.month === 11 || current.month === 12
                ? current.year + 1
                : current.year
            }-${
              current.month === 11 || current.month === 12
                ? (current.month - 10).toString().padStart(2, '0')
                : (current.month + 2).toString().padStart(2, '0')
            }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        .then((res) => {
          console.log('다음 달 예약 배열', res.data);

          dispatch(clickRightArrow(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getNextMonthReservation();
    // dispatch(
    //   clickRightArrow([
    //     {
    //       startDate: '2023-08-22',
    //       endDate: '2023-09-01',
    //     },
    //     {
    //       startDate: '2023-09-15',
    //       endDate: '2023-09-20',
    //     },
    //     {
    //       startDate: '2023-09-22',
    //       endDate: '2023-10-30',
    //     },
    //   ]),
    // );

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
      {new Date().getFullYear() === current.year &&
      new Date().getMonth() + 1 === current.month ? (
        <span />
      ) : (
        <Btn onClick={onClickBack}>◀️</Btn>
      )}
      <Btn onClick={onClickNext}>▶️</Btn>
    </ButtonWrapper>
  );
}
export default MonthSwitchBtns;
