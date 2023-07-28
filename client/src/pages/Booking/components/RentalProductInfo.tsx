import { ProductInfo, ProductInfoTitle, ProductInfoWrapper } from '../style';

function RentalProductInfo({ monthlyReservation }: any) {
  return (
    <>
      <ProductInfoTitle>
        렌탈 품목 : {monthlyReservation.productTitle}
      </ProductInfoTitle>
      <ProductInfoWrapper>
        <ProductInfo>기본료 : {monthlyReservation.baseFee}원</ProductInfo>
        <ProductInfo>1일 사용료 : {monthlyReservation.feePerDay}원</ProductInfo>
        <ProductInfo>
          최소 예약 기간 : {monthlyReservation.minimumRentalPeriod}일
        </ProductInfo>
      </ProductInfoWrapper>
    </>
  );
}
export default RentalProductInfo;
