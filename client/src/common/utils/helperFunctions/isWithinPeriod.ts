import { StartEndDateProps } from '../../../pages/Booking/model/IStartEndDateProps';
import { DateType } from '../../../pages/Booking/type';

export const isWithinPeriod = (
  startDate: DateType,
  endDate: DateType,
  reservation: StartEndDateProps,
) => {
  const start = new Date(startDate.year, startDate.month - 1, startDate.date);
  const end = new Date(endDate.year, endDate.month - 1, endDate.date);

  const reservationStart = new Date(
    reservation.startDate.year,
    reservation.startDate.month - 1,
    reservation.startDate.date,
  );
  const reservationEnd = new Date(
    reservation.endDate.year,
    reservation.endDate.month - 1,
    reservation.endDate.date,
  );

  // 시작 날짜와 종료 날짜가 예약 기간 안에 있는지 확인
  if (start >= reservationStart && start <= reservationEnd) return true;
  if (end >= reservationStart && end <= reservationEnd) return true;

  // 예약이 시작 날짜와 종료 날짜 사이에 있는지 확인
  if (reservationStart >= start && reservationStart <= end) return true;
  if (reservationEnd >= start && reservationEnd <= end) return true;

  return false;
};
