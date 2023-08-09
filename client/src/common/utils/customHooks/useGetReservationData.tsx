import axios from 'axios';
import { turnStringArrIntoDateObjectArr } from '../helperFunctions/turnStringArrIntoDateObjectArr';

const useGetReservationData = (itemId: string | undefined) => {
  const getReservationData = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    const nextMonth = (today.getMonth() + 2).toString().padStart(2, '0');

    const res = await axios.get(
      process.env.REACT_APP_API_URL +
        `/api/reservations/products/${itemId}/calendar?date1=${year}-${currentMonth}&date2=${year}-${nextMonth}`,
    );

    const data = {
      productTitle: res.data.productTitle,
      baseFee: res.data.baseFee,
      feePerDay: res.data.feePerDay,
      minimumRentalPeriod: res.data.minimumRentalPeriod,
      reservationsDate1: turnStringArrIntoDateObjectArr(
        res.data.reservationsDate1,
      ),
      reservationsDate2: turnStringArrIntoDateObjectArr(
        res.data.reservationsDate2,
      ),
    };
    return data;
  };
  return getReservationData;
};
export default useGetReservationData;
