// 신규 예약 정보 POST 요청
export interface IReservationData {
  startDate: { year: number; month: number; date: number } | null;
  endDate: { year: number; month: number; date: number } | null;
  productId: string | undefined;
}
