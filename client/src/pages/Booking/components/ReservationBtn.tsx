import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BigBtn from '../../../common/components/Button';
import { RootState } from '../../../common/store/RootStore';
import { IReservationData } from '../model/IReservationData';
import { colorPalette } from '../../../common/utils/enum/colorPalette';

const sendReservationData = async ({
  startDate,
  endDate,
  productId,
}: IReservationData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/reservations/products/${productId}`,
      {
        startDate: startDate,
        endDate: endDate,
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

  const handleReservationClick = () => {
    mutation.mutate({
      startDate: currentReservationDate.startDate,
      endDate: currentReservationDate.endDate,
      productId: itemId,
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
