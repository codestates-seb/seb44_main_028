export const turnStringArrIntoDateObjectArr = (
  date: { startDate: string; endDate: string }[],
) => {
  const dateObjectArr = date.map(
    (dateObj: { startDate: string; endDate: string }) => {
      const startDate = {
        year: Number(dateObj.startDate.slice(0, 4)),
        month: Number(dateObj.startDate.slice(5, 7)),
        date: Number(dateObj.startDate.slice(8, 10)),
      };
      const endDate = {
        year: Number(dateObj.endDate.slice(0, 4)),
        month: Number(dateObj.endDate.slice(5, 7)),
        date: Number(dateObj.endDate.slice(8, 10)),
      };
      return { startDate, endDate };
    },
  );
  return dateObjectArr;
};
