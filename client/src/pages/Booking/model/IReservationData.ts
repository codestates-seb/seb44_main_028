import { DateType } from '../type';

// 신규 예약 정보 POST 요청
export interface IReservationData {
  startDate: string | null;
  endDate: string | null;
  productId: string | undefined;
  accessToken: string | null;
}
