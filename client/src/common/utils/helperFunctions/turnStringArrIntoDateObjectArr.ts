import { convertStringToDateObject } from './convertStringToDateObject';

export const turnStringArrIntoDateObjectArr = (
  date: { startDate: string; endDate: string }[],
) => {
  const dateObjectArr = date.map(
    (dateObj: { startDate: string; endDate: string }) => {
      return {
        startDate: convertStringToDateObject(dateObj.startDate),
        endDate: convertStringToDateObject(dateObj.endDate),
      };
    },
  );
  return dateObjectArr;
};
