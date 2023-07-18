export function makeCalendar(
  firstDayOfThisMonth: number,
  lastDateOfThisMonth: number,
) {
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
  return dates;
}
