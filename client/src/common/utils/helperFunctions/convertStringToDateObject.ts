export const convertStringToDateObject = (dateStr: string) => {
  const dateParts = dateStr.split('-');
  return {
    year: parseInt(dateParts[0], 10),
    month: parseInt(dateParts[1], 10),
    date: parseInt(dateParts[2], 10),
  };
};
