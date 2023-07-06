import { useDispatch, useSelector } from 'react-redux';
import { DatesContainer, EachDate } from '../style';
import { RootState } from '../../../common/store/RootStore';
import { setDate } from '../store/CalendarStore';

function Dates() {
  const dispatch = useDispatch();
  const currentDate = useSelector((state: RootState) => state.calendar);
  const { year, month, date } = currentDate;
  // 지난 달 마지막 날짜를 구함
  const lastDateOfLastMonth = new Date(year, month - 1, 0).getDate();
  // 이번 달 마지막 날짜를 구함
  const lastDateOfThisMonth = new Date(year, month, 0).getDate();
  // 이번 달 1일이 무슨 요일인지 구함
  const firstDayOfThisMonth = new Date(year, month - 1, 1).getDay();

  // 달력 2차원 빈 배열 선언
  const dates = [...Array(6)].map((_) => [...Array(7)].map(() => 0));
  dates[0][firstDayOfThisMonth] = 1;

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      for (let k = 1; k <= firstDayOfThisMonth; k++) {
        dates[0][firstDayOfThisMonth - k] = lastDateOfLastMonth - k + 1;
      }
    }
    for (let j = 0; j < 7; j++) {
      if (dates[i][j]) {
        continue;
      }
      if (dates[i][j - 1]) {
        dates[i][j] = dates[i][j - 1] + 1;
      } else if (dates[i - 1]?.[6]) {
        if (dates[i - 1].includes(lastDateOfThisMonth) && i > 1) break;
        dates[i][j] = dates[i - 1][6] + 1;
      }

      if (dates[i][j - 1] === lastDateOfThisMonth) {
        dates[i][j] = 1;
      }
    }
  }

  const showDates = dates.map((week, i) => (
    <tr key={i}>
      {week.map((date, j) => (
        <EachDate
          key={j}
          today={currentDate}
          row={{
            week: i,
            lastWeek: dates.findIndex(
              (week, index) => index !== 0 && week.includes(1),
            ),
          }}
          day={j}
          onClick={() => dispatch(setDate({ year, month, date }))}
        >
          {date ? date : null}
        </EachDate>
      ))}
    </tr>
  ));

  return <DatesContainer>{showDates}</DatesContainer>;
}
export default Dates;
