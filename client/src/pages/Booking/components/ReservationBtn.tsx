import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { makeDateFilledWithZero } from '../../../common/utils/helperFunctions/makeDateFilledWithZero';
import BigBtn from '../../../common/components/Button';
import { RootState } from '../../../common/store/RootStore';
import { IReservationData } from '../model/IReservationData';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { ACCESS_TOKEN } from '../../Login/constants';

const sendReservationData = async ({
  startDate,
  endDate,
  productId,
  accessToken,
}: IReservationData) => {
  console.log('startDate', startDate);
  console.log('endDate', endDate);
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
    console.log('1. POST 요청에 대한 응답', response);
    return response.data;
  } catch (error) {
    console.log('POST 요청 시 에러', error);
  }
};

function ReservationBtn() {
  const { itemId } = useParams<{ itemId: string }>();
  // 유저가 선택한 날짜를 가져온다.
  const currentReservationDate = useSelector(
    (state: RootState) => state.reservation,
  );
  console.log('시작 날짜', currentReservationDate.startDate);
  console.log('마감 날짜', currentReservationDate.endDate);

  const queryClient = useQueryClient();

  const mutation = useMutation(sendReservationData, {
    onSuccess: () => {
      queryClient.invalidateQueries('reservation');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const decrypt = useDecryptToken();
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!encryptedAccessToken) {
    alert('로그인이 필요합니다.');
    return null;
  }
  const accessToken = decrypt(encryptedAccessToken);

  const handleReservationClick = () => {
    const startDate = currentReservationDate.startDate;
    const endDate = currentReservationDate.endDate;
    if (!startDate || !endDate) {
      alert('날짜를 선택해주세요');
      return null;
    }

    mutation.mutate({
      startDate: makeDateFilledWithZero(startDate, '-'),
      endDate: makeDateFilledWithZero(endDate, '-'),
      productId: itemId,
      accessToken,
    });
  };

  return (
    <BigBtn
      color={colorPalette.whiteColor}
      backgroundColor={colorPalette.heavyColor}
      hoverBackgroundColor={colorPalette.rightButtonHoverColor}
      height={57}
      width={175}
      children={'예약하기'}
      onClick={handleReservationClick}
    />
  );
}
export default ReservationBtn;
