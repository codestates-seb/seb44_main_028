import { WritePostContainer } from '../style';
const WritePost = () => {
  return (
    <WritePostContainer>
      <label htmlFor="minRentalPeriod">최소 대여시간</label>
      <input type="text" id="minRentalPeriod" />
      <label htmlFor="baseFee">고정금액</label>
      <input type="text" id="baseFee" />
      <label htmlFor="feePerDay">1일 당 추가금액</label>
      <input type="text" id="feePerDay" />
    </WritePostContainer>
  );
};

export default WritePost;
