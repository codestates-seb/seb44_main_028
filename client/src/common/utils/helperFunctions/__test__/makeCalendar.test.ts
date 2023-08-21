import { makeCalendar } from '../makeCalendar';

describe('makeCalendar', () => {
  it('should generate a correct calendar for July 2023', () => {
    const firstDayOfThisMonth = new Date(2023, 6, 1).getDay(); // July 2023 starts on Saturday
    const lastDateOfThisMonth = new Date(2023, 7, 0).getDate(); // July 2023 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 0, 1]); // July 2023 starts from Saturday
    expect(result[5]).toEqual([30, 31, 0, 0, 0, 0, 0]); // July 2023 ends at 31
  });
  it('should generate a correct calendar for August 2023', () => {
    const firstDayOfThisMonth = new Date(2023, 7, 1).getDay(); // August 2023 starts on Tuesday
    const lastDateOfThisMonth = new Date(2023, 8, 0).getDate(); // August 2023 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 1, 2, 3, 4, 5]); // August 2023 starts from Tuesday
    expect(result[4]).toEqual([27, 28, 29, 30, 31, 0, 0]); // August 2023 ends at 31
  });
  it('should generate a correct calendar for September 2023', () => {
    const firstDayOfThisMonth = new Date(2023, 8, 1).getDay(); // September 2023 starts on Friday
    const lastDateOfThisMonth = new Date(2023, 9, 0).getDate(); // September 2023 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 1, 2]); // September 2023 starts from Friday
    expect(result[4]).toEqual([24, 25, 26, 27, 28, 29, 30]); // September 2023 ends at 30
  });
  it('should generate a correct calendar for October 2023', () => {
    const firstDayOfThisMonth = new Date(2023, 9, 1).getDay(); // October 2023 starts on Sunday
    const lastDateOfThisMonth = new Date(2023, 10, 0).getDate(); // October 2023 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([1, 2, 3, 4, 5, 6, 7]); // October 2023 starts from Sunday
    expect(result[4]).toEqual([29, 30, 31, 0, 0, 0, 0]); // October 2023 ends at 31
  });
  it('should generate a correct calendar for November 2023', () => {
    const firstDayOfThisMonth = new Date(2023, 10, 1).getDay(); // November 2023 starts on Wednesday
    const lastDateOfThisMonth = new Date(2023, 11, 0).getDate(); // November 2023 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 1, 2, 3, 4]); // November 2023 starts from Wednesday
    expect(result[4]).toEqual([26, 27, 28, 29, 30, 0, 0]); // November 2023 ends at 30
  });
  it('should generate a correct calendar for December 2023', () => {
    const firstDayOfThisMonth = new Date(2023, 11, 1).getDay(); // December 2023 starts on Friday
    const lastDateOfThisMonth = new Date(2023, 12, 0).getDate(); // December 2023 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 1, 2]); // December 2023 starts from Friday
    expect(result[5]).toEqual([31, 0, 0, 0, 0, 0, 0]); // December 2023 ends at 31
  });
  it('should generate a correct calendar for January 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 0, 1).getDay(); // January 2024 starts on Monday
    const lastDateOfThisMonth = new Date(2024, 1, 0).getDate(); // January 2024 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]); // January 2024 starts from Monday
    expect(result[4]).toEqual([28, 29, 30, 31, 0, 0, 0]); // January 2024 ends at 31
  });
  it('should generate a correct calendar for February 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 1, 1).getDay(); // February 2024 starts on Thursday
    const lastDateOfThisMonth = new Date(2024, 2, 0).getDate(); // February 2024 has 29 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 1, 2, 3]); // February 2024 starts from Thursday
    expect(result[4]).toEqual([25, 26, 27, 28, 29, 0, 0]); // February 2024 ends at 29
  });
  it('should generate a correct calendar for March 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 2, 1).getDay(); // March 2024 starts on Sunday
    const lastDateOfThisMonth = new Date(2024, 3, 0).getDate(); // March 2024 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 1, 2]); // March 2024 starts from Sunday
    expect(result[5]).toEqual([31, 0, 0, 0, 0, 0, 0]); // March 2024 ends at 31
  });
  it('should generate a correct calendar for April 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 3, 1).getDay(); // April 2024 starts on Wednesday
    const lastDateOfThisMonth = new Date(2024, 4, 0).getDate(); // April 2024 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]); // April 2024 starts from Wednesday
    expect(result[4]).toEqual([28, 29, 30, 0, 0, 0, 0]); // April 2024 ends at 30
  });
  it('should generate a correct calendar for May 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 4, 1).getDay(); // May 2024 starts on Friday
    const lastDateOfThisMonth = new Date(2024, 5, 0).getDate(); // May 2024 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 1, 2, 3, 4]); // May 2024 starts from Friday
    expect(result[4]).toEqual([26, 27, 28, 29, 30, 31, 0]); // May 2024 ends at 31
  });
  it('should generate a correct calendar for June 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 5, 1).getDay(); // June 2024 starts on Monday
    const lastDateOfThisMonth = new Date(2024, 6, 0).getDate(); // June 2024 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 0, 1]); // June 2024 starts from Monday
    expect(result[5]).toEqual([30, 0, 0, 0, 0, 0, 0]); // June 2024 ends at 30
  });
  it('should generate a correct calendar for July 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 6, 1).getDay(); // July 2024 starts on Wednesday
    const lastDateOfThisMonth = new Date(2024, 7, 0).getDate(); // July 2024 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]); // July 2024 starts from Wednesday
    expect(result[4]).toEqual([28, 29, 30, 31, 0, 0, 0]); // July 2024 ends at 31
  });
  it('should generate a correct calendar for August 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 7, 1).getDay(); // August 2024 starts on Saturday
    const lastDateOfThisMonth = new Date(2024, 8, 0).getDate(); // August 2024 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 1, 2, 3]); // August 2024 starts from Saturday
    expect(result[4]).toEqual([25, 26, 27, 28, 29, 30, 31]); // August 2024 ends at 31
  });
  it('should generate a correct calendar for September 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 8, 1).getDay(); // September 2024 starts on Tuesday
    const lastDateOfThisMonth = new Date(2024, 9, 0).getDate(); // September 2024 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([1, 2, 3, 4, 5, 6, 7]); // September 2024 starts from Tuesday
    expect(result[4]).toEqual([29, 30, 0, 0, 0, 0, 0]); // September 2024 ends at 30
  });
  it('should generate a correct calendar for October 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 9, 1).getDay(); // October 2024 starts on Thursday
    const lastDateOfThisMonth = new Date(2024, 10, 0).getDate(); // October 2024 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 1, 2, 3, 4, 5]); // October 2024 starts from Thursday
    expect(result[4]).toEqual([27, 28, 29, 30, 31, 0, 0]); // October 2024 ends at 31
  });
  it('should generate a correct calendar for November 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 10, 1).getDay(); // November 2024 starts on Sunday
    const lastDateOfThisMonth = new Date(2024, 11, 0).getDate(); // November 2024 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 1, 2]); // November 2024 starts from Sunday
    expect(result[4]).toEqual([24, 25, 26, 27, 28, 29, 30]); // November 2024 ends at 30
  });
  it('should generate a correct calendar for December 2024', () => {
    const firstDayOfThisMonth = new Date(2024, 11, 1).getDay(); // December 2024 starts on Tuesday
    const lastDateOfThisMonth = new Date(2024, 12, 0).getDate(); // December 2024 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([1, 2, 3, 4, 5, 6, 7]); // December 2024 starts from Tuesday
    expect(result[4]).toEqual([29, 30, 31, 0, 0, 0, 0]); // December 2024 ends at 31
  });
  it('should generate a correct calendar for January 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 0, 1).getDay(); // January 2025 starts on Wednesday
    const lastDateOfThisMonth = new Date(2025, 1, 0).getDate(); // January 2025 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 1, 2, 3, 4]); // January 2025 starts from Wednesday
    expect(result[4]).toEqual([26, 27, 28, 29, 30, 31, 0]); // January 2025 ends at 31
  });
  it('should generate a correct calendar for February 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 1, 1).getDay(); // February 2025 starts on Saturday
    const lastDateOfThisMonth = new Date(2025, 2, 0).getDate(); // February 2025 has 28 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 0, 1]); // February 2025 starts from Saturday
    expect(result[4]).toEqual([23, 24, 25, 26, 27, 28, 0]); // February 2025 ends at 28
  });
  it('should generate a correct calendar for March 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 2, 1).getDay(); // March 2025 starts on Saturday
    const lastDateOfThisMonth = new Date(2025, 3, 0).getDate(); // March 2025 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 0, 1]); // March 2025 starts from Saturday
    expect(result[5]).toEqual([30, 31, 0, 0, 0, 0, 0]); // March 2025 ends at 31
  });
  it('should generate a correct calendar for April 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 3, 1).getDay(); // April 2025 starts on Tuesday
    const lastDateOfThisMonth = new Date(2025, 4, 0).getDate(); // April 2025 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 1, 2, 3, 4, 5]); // April 2025 starts from Tuesday
    expect(result[4]).toEqual([27, 28, 29, 30, 0, 0, 0]); // April 2025 ends at 30
  });
  it('should generate a correct calendar for May 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 4, 1).getDay(); // May 2025 starts on Thursday
    const lastDateOfThisMonth = new Date(2025, 5, 0).getDate(); // May 2025 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 1, 2, 3]); // May 2025 starts from Thursday
    expect(result[4]).toEqual([25, 26, 27, 28, 29, 30, 31]); // May 2025 ends at 31
  });
  it('should generate a correct calendar for June 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 5, 1).getDay(); // June 2025 starts on Sunday
    const lastDateOfThisMonth = new Date(2025, 6, 0).getDate(); // June 2025 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([1, 2, 3, 4, 5, 6, 7]); // June 2025 starts from Sunday
    expect(result[4]).toEqual([29, 30, 0, 0, 0, 0, 0]); // June 2025 ends at 30
  });
  it('should generate a correct calendar for July 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 6, 1).getDay(); // July 2025 starts on Tuesday
    const lastDateOfThisMonth = new Date(2025, 7, 0).getDate(); // July 2025 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 1, 2, 3, 4, 5]); // July 2025 starts from Tuesday
    expect(result[4]).toEqual([27, 28, 29, 30, 31, 0, 0]); // July 2025 ends at 31
  });
  it('should generate a correct calendar for August 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 7, 1).getDay(); // August 2025 starts on Friday
    const lastDateOfThisMonth = new Date(2025, 8, 0).getDate(); // August 2025 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 1, 2]); // August 2025 starts from Friday
    expect(result[4]).toEqual([24, 25, 26, 27, 28, 29, 30]); // August 2025 ends at 31
  });
  it('should generate a correct calendar for September 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 8, 1).getDay(); // September 2025 starts on Monday
    const lastDateOfThisMonth = new Date(2025, 9, 0).getDate(); // September 2025 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]); // September 2025 starts from Monday
    expect(result[4]).toEqual([28, 29, 30, 0, 0, 0, 0]); // September 2025 ends at 30
  });
  it('should generate a correct calendar for October 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 9, 1).getDay(); // October 2025 starts on Wednesday
    const lastDateOfThisMonth = new Date(2025, 10, 0).getDate(); // October 2025 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 1, 2, 3, 4]); // October 2025 starts from Wednesday
    expect(result[4]).toEqual([26, 27, 28, 29, 30, 31, 0]); // October 2025 ends at 31
  });
  it('should generate a correct calendar for November 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 10, 1).getDay(); // November 2025 starts on Saturday
    const lastDateOfThisMonth = new Date(2025, 11, 0).getDate(); // November 2025 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 0, 1]); // November 2025 starts from Saturday
    expect(result[4]).toEqual([23, 24, 25, 26, 27, 28, 29]); // November 2025 ends at 30
  });
  it('should generate a correct calendar for December 2025', () => {
    const firstDayOfThisMonth = new Date(2025, 11, 1).getDay(); // December 2025 starts on Monday
    const lastDateOfThisMonth = new Date(2026, 0, 0).getDate(); // December 2025 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]); // December 2025 starts from Monday
    expect(result[4]).toEqual([28, 29, 30, 31, 0, 0, 0]); // December 2025 ends at 31
  });
  it('should generate a correct calendar for January 2026', () => {
    const firstDayOfThisMonth = new Date(2026, 0, 1).getDay(); // January 2026 starts on Thursday
    const lastDateOfThisMonth = new Date(2026, 1, 0).getDate(); // January 2026 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 1, 2, 3]); // January 2026 starts from Thursday
    expect(result[4]).toEqual([25, 26, 27, 28, 29, 30, 31]); // January 2026 ends at 31
  });
  it('should generate a correct calendar for February 2026', () => {
    const firstDayOfThisMonth = new Date(2026, 1, 1).getDay(); // February 2026 starts on Sunday
    const lastDateOfThisMonth = new Date(2026, 2, 0).getDate(); // February 2026 has 28 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([1, 2, 3, 4, 5, 6, 7]); // February 2026 starts from Sunday
    expect(result[3]).toEqual([22, 23, 24, 25, 26, 27, 28]); // February 2026 ends at 28
  });
  it('should generate a correct calendar for March 2026', () => {
    const firstDayOfThisMonth = new Date(2026, 2, 1).getDay(); // March 2026 starts on Sunday
    const lastDateOfThisMonth = new Date(2026, 3, 0).getDate(); // March 2026 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([1, 2, 3, 4, 5, 6, 7]); // March 2026 starts from Sunday
    expect(result[4]).toEqual([29, 30, 31, 0, 0, 0, 0]); // March 2026 ends at 31
  });
  it('should generate a correct calendar for April 2026', () => {
    const firstDayOfThisMonth = new Date(2026, 3, 1).getDay(); // April 2026 starts on Wednesday
    const lastDateOfThisMonth = new Date(2026, 4, 0).getDate(); // April 2026 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 1, 2, 3, 4]); // April 2026 starts from Wednesday
    expect(result[4]).toEqual([26, 27, 28, 29, 30, 0, 0]); // April 2026 ends at 30
  });
  it('should generate a correct calendar for May 2026', () => {
    const firstDayOfThisMonth = new Date(2026, 4, 1).getDay(); // May 2026 starts on Friday
    const lastDateOfThisMonth = new Date(2026, 5, 0).getDate(); // May 2026 has 31 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 0, 0, 0, 0, 1, 2]); // May 2026 starts from Friday
    expect(result[5]).toEqual([31, 0, 0, 0, 0, 0, 0]); // May 2026 ends at 31
  });
  it('should generate a correct calendar for June 2026', () => {
    const firstDayOfThisMonth = new Date(2026, 5, 1).getDay(); // June 2026 starts on Monday
    const lastDateOfThisMonth = new Date(2026, 6, 0).getDate(); // June 2026 has 30 days
    const result = makeCalendar(firstDayOfThisMonth, lastDateOfThisMonth);

    expect(result[0]).toEqual([0, 1, 2, 3, 4, 5, 6]); // June 2026 starts from Monday
    expect(result[4]).toEqual([28, 29, 30, 0, 0, 0, 0]); // June 2026 ends at 30
  });
});
