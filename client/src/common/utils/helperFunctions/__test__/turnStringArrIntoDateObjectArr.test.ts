import { turnStringArrIntoDateObjectArr } from '../turnStringArrIntoDateObjectArr';

describe('turnStringArrIntoDateObjectArr', () => {
  it('should convert a string array to a date object array', () => {
    const result = turnStringArrIntoDateObjectArr([
      { startDate: '2023-07-11', endDate: '2023-07-12' },
      { startDate: '2023-08-13', endDate: '2023-09-14' },
    ]);
    expect(result).toEqual([
      {
        startDate: { year: 2023, month: 7, date: 11 },
        endDate: { year: 2023, month: 7, date: 12 },
      },
      {
        startDate: { year: 2023, month: 8, date: 13 },
        endDate: { year: 2023, month: 9, date: 14 },
      },
    ]);
  });
});
