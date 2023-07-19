import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate } from '../store/ReservationDateStore';
import { DatesContainer, EachDate } from '../style';
import { RootState } from '../../../common/store/RootStore';
import { CalendarProps } from '../type';
import { makeCalendar } from '../../../common/utils/helperFunctions/makeCalendar';

// reservationDataFromServer는 서버에서 받아온 예약 데이터를 저장
function Dates({ calendar, reservationDataFromServer }: CalendarProps) {
  const dispatch = useDispatch();
  // reservationDatesClickedByUser은 유저가 예약 날짜를 클릭하여 선택할 때 사용
  const reservationDatesClickedByUser = useSelector(
    (state: RootState) => state.reservation,
  );
  const allReservations = useSelector((state: RootState) => [
    ...state.monthlyReservation.reservationsDate1,
    ...state.monthlyReservation.reservationsDate2,
  ]);

  const { year, month } = calendar;
  // 이번 달 마지막 날짜를 구함
  const lastDateOfThisMonth: number = new Date(year, month, 0).getDate();
  // 이번 달 1일이 무슨 요일인지 구함
  const firstDayOfThisMonth: number = new Date(year, month - 1, 1).getDay();

  const dates = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

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
          reservationDataFromServer={reservationDataFromServer}
          onClick={() => {
            if (
              !reservationDatesClickedByUser.startDate ||
              // startDate과 endDate 둘 다 있는데 유저가 원래 startDate보다 이전 날짜를 클릭했을 때
              (reservationDatesClickedByUser.startDate &&
                reservationDatesClickedByUser.endDate &&
                new Date(
                  reservationDatesClickedByUser.startDate.year,
                  reservationDatesClickedByUser.startDate.month - 1,
                  reservationDatesClickedByUser.startDate.date,
                ).getTime() > new Date(year, month - 1, date).getTime())
            ) {
              dispatch(
                setStartDate({
                  ...reservationDatesClickedByUser,
                  allReservations,
                  startDate: { ...calendar, date },
                }),
              );
            } else {
              dispatch(
                setEndDate({
                  ...reservationDatesClickedByUser,
                  allReservations,
                  endDate: { ...calendar, date },
                }),
              );
            }
          }}
        >
          {date ? date : null}
        </EachDate>
      ))}
    </tr>
  ));

  return <DatesContainer>{showDates}</DatesContainer>;
}
export default Dates;
