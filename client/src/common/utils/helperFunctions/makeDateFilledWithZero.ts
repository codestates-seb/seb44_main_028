export const makeDateFilledWithZero = (
  reservationDate: { year: number; month: number; date: number } | null,
) => {
  const fillZero = (number: number) => {
    return String(number).padStart(2, '0');
  };

  if (reservationDate) {
    const { year, month, date } = reservationDate;
    return `${year}.${fillZero(month)}.${fillZero(date)}`;
  } else {
    return null;
  }
};
