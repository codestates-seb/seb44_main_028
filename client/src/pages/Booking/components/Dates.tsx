import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate } from '../store/ReservationDateStore';
import { DatesContainer, EachDate } from '../style';
import { RootState } from '../../../common/store/RootStore';
import { CalendarProps } from '../type';
import { makeCalendar } from '../../../common/utils/helperFunctions/makeCalendar';

function Dates({ calendar, reservationData }: CalendarProps) {
  const dispatch = useDispatch();
  // TODO: reservationData와 reservationState이 명확히 구분되도록 수정
  const reservationState = useSelector((state: RootState) => state.reservation);
  const allReservations = useSelector((state: RootState) => [
    ...state.monthlyReservation.reservationsDate1,
    ...state.monthlyReservation.reservationsDate2,
  ]);

  const { year, month, date } = calendar;
  // 이번 달 마지막 날짜를 구함
  const lastDateOfThisMonth: number = new Date(year, month, 0).getDate();
  // 이번 달 1일이 무슨 요일인지 구함
  const firstDayOfThisMonth: number = new Date(year, month - 1, 1).getDay();
  // 달력에 표시할 날짜들을 구함
  const dates = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

  const handleClickDate = () => {
    if (!reservationState.startDate) {
      dispatch(
        setStartDate({
          ...reservationState,
          allReservations,
          startDate: { ...calendar, date },
        }),
      );
    } else {
      dispatch(
        setEndDate({
          ...reservationState,
          allReservations,
          endDate: { ...calendar, date },
        }),
      );
    }
  };

  const showDates = dates.map((week, i) => (
    <tr key={i}>
      {week.map((date, j) => (
        <EachDate
          key={j}
          current={calendar}
          row={{
            week: i,
            finalWeek: dates.findIndex(
              (week, index) => index !== 0 && week.includes(1),
            ),
          }}
          day={j}
          reservationData={reservationData}
          onClick={handleClickDate}
        >
          {date ? date : null}
        </EachDate>
      ))}
    </tr>
  ));

  return <DatesContainer>{showDates}</DatesContainer>;
}
export default Dates;
