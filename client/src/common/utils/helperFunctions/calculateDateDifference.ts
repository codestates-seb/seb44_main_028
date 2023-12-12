import { DateType } from '../../../pages/Booking/type';

export function calculateDateDifference(
  startDate: DateType,
  endDate: DateType,
) {
  // JavaScript의 Date 객체의 month 인자는 0부터 시작합니다.
  // 따라서, month에서 1을 빼줍니다.
  const start = new Date(startDate.year, startDate.month - 1, startDate.date);
  const end = new Date(endDate.year, endDate.month - 1, endDate.date);

  // 두 날짜 사이의 차이는 밀리초 단위이므로, 이를 일 단위로 바꾸기 위해
  // 1000(밀리초->초), 60(초->분), 60(분->시간), 24(시간->일)로 나눕니다.
  const differenceInDays = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  return differenceInDays + 1;
}
