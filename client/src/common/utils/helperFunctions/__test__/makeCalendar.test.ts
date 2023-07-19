import { makeCalendar } from '../makeCalendar';

describe('makeCalendar', () => {
  it('should generate a correct calendar for July 2023', () => {
    const firstDayOfThisMonth = new Date(2023, 6, 1).getDay(); // July 2023 starts on Saturday
    const lastDateOfThisMonth = new Date(2023, 7, 0).getDate(); // July 2023 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 0, 1]); // July 2023 starts from Saturday
    expect(result[5]).toEqual([30, 31, 0, 0, 0, 0, 0]); // July 2023 ends at 31
  });
});
