import { DateType } from '../type';

// 신규 예약 정보 POST 요청
export interface IReservationData {
  startDate: DateType | null;
  endDate: DateType | null;
  productId: string | undefined;
}
