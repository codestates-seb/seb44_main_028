import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';

const BorrowCancel = () => {
  const decrypt = useDecryptToken();
  const { reservationId } = useParams();

  const [canceled, setCanceled] = useState([]);

  useEffect(() => {
    reserationCancel();
  }, [reservationId]);

  const reserationCancel = async () => {
    try {
      await axios.patch(`/api/reservations${reservationId}/cancel`, {
        canceled: true,
      });
      //get 요청으로 취소 내역 가져오기
      const response = await axios.get(`/api/reservations`);
      setCanceled(response.data);
    } catch (error) {
      console.error('취소 내역을 가져오는데 실패했습니다.', error);
    }
  };
  //취소내역 가져오기
  useEffect(() => {
    const canceledHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reservations`,
        );
        setCanceled(response.data);
      } catch (error) {
        console.error('취소 내역을 가져오는데 실패했습니다.', error);
      }
    };
    reserationCancel();
  }, []);

  return <div>BorrowCancel</div>;
};

export default BorrowCancel;
