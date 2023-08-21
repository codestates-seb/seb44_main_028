import { convertStringToDateObject } from '../convertStringToDateObject';

describe('convertStringToDateObject', () => {
  it('should convert a string to a date object', () => {
    const result = convertStringToDateObject('2020-07-11');
    expect(result).toEqual({ year: 2020, month: 7, date: 11 });
  });
  it('should convert a string to a date object', () => {
    const result = convertStringToDateObject('2023-08-26');
    expect(result).toEqual({ year: 2023, month: 8, date: 26 });
  });
  it('should convert a string to a date object', () => {
    const result = convertStringToDateObject('2022-12-11');
    expect(result).toEqual({ year: 2022, month: 12, date: 11 });
  });
});
