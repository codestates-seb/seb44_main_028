import { useDispatch, useSelector } from 'react-redux';
import { DatesContainer, EachDate } from '../style';
import { CalendarProps } from '../type';
import { RootState } from '../../../common/store/RootStore';
import { setEndDate, setStartDate } from '../store/ReservationDateStore';

function Dates({ calendar, reservationData }: CalendarProps) {
  const dispatch = useDispatch();
  const reservationState = useSelector((state: RootState) => state.reservation);

  const { year, month, date } = calendar;
  // 지난 달 마지막 날짜를 구함
  // const lastDateOfLastMonth: number = new Date(year, month - 1, 0).getDate();
  // 이번 달 마지막 날짜를 구함
  const lastDateOfThisMonth: number = new Date(year, month, 0).getDate();
  // 이번 달 1일이 무슨 요일인지 구함
  const firstDayOfThisMonth: number = new Date(year, month - 1, 1).getDay();

  // 달력 2차원 빈 배열 선언
  const dates: number[][] = [...Array(6)].map((_) =>
    [...Array(7)].map(() => 0),
  );
  dates[0][firstDayOfThisMonth] = 1;

  for (let i = 0; i < dates.length; i++) {
    // if (i === 0) {
    //   for (let k = 1; k <= firstDayOfThisMonth; k++) {
    //     dates[0][firstDayOfThisMonth - k] = lastDateOfLastMonth - k + 1;
    //   }
    // }
    for (let j = 0; j < 7; j++) {
      // if (dates[i][j]) {
      //   continue;
      // }
      if (dates[i][j - 1]) {
        dates[i][j] = dates[i][j - 1] + 1;
        if (dates[i][j] === lastDateOfThisMonth) {
          break;
        }
      } else if (dates[i - 1]?.[6]) {
        if (dates[i - 1].includes(lastDateOfThisMonth) && i > 1) break;

        dates[i][j] = dates[i - 1][6] + 1;
      }

      if (dates[i][j] === lastDateOfThisMonth) {
        break;
      }
    }
  }

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
          onClick={() => {
            console.log({ ...calendar, date });
            if (!reservationState.startDate) {
              dispatch(
                setStartDate({
                  ...reservationState,
                  startDate: { ...calendar, date },
                }),
              );
            } else {
              dispatch(
                setEndDate({
                  ...reservationState,
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
