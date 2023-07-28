import axios, { AxiosError } from 'axios';
import { IReservationData } from '../../../pages/Booking/model/IReservationData';

const usePostReservationData = () => {
  const sendReservationData = async ({
    startDate,
    endDate,
    productId,
    accessToken,
  }: IReservationData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/reservations/products/${productId}`,
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      alert('예약이 완료되었습니다.');

      return response.data;
    } catch (error: AxiosError | any) {
      console.log('POST 요청 시 에러', error.message);
    }
  };
  return sendReservationData;
};
export default usePostReservationData;
