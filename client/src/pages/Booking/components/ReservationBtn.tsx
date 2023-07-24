import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { makeDateFilledWithZero } from '../../../common/utils/helperFunctions/makeDateFilledWithZero';
import BigBtn from '../../../common/components/Button';
import { RootState } from '../../../common/store/RootStore';
import { IReservationData } from '../model/IReservationData';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { ACCESS_TOKEN } from '../../Login/constants';
import { DateType } from '../type';
import useGetMe from '../../../common/utils/customHooks/useGetMe';

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
    alert('예약이 완료되었습니다.');

    return response.data;
  } catch (error: AxiosError | any) {
    console.log('POST 요청 시 에러', error.message);
  }
};

function calculateDateDifference(startDate: DateType, endDate: DateType) {
  // JavaScript의 Date 객체의 month 인자는 0부터 시작합니다.
  // 따라서, month에서 1을 빼줍니다.
  const start = new Date(startDate.year, startDate.month - 1, startDate.date);
  const end = new Date(endDate.year, endDate.month - 1, endDate.date);

  // 두 날짜 사이의 차이는 밀리초 단위이므로, 이를 일 단위로 바꾸기 위해
  // 1000(밀리초->초), 60(초->분), 60(분->시간), 24(시간->일)로 나눕니다.
  const differenceInDays = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
  );

  return differenceInDays + 1;
}

function ReservationBtn({
  minimumRentalPeriod,
}: {
  minimumRentalPeriod: number;
}) {
  const { itemId } = useParams<{ itemId: string }>();
  // 유저가 선택한 날짜를 가져온다.
  const currentReservationDate = useSelector(
    (state: RootState) => state.reservation,
  );
  const navigate = useNavigate();
  console.log('시작 날짜', currentReservationDate.startDate);
  console.log('마감 날짜', currentReservationDate.endDate);
  if (currentReservationDate.startDate && currentReservationDate.endDate) {
    console.log(
      '두 날짜의 차이',
      calculateDateDifference(
        currentReservationDate.startDate,
        currentReservationDate.endDate,
      ),
    );
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(sendReservationData, {
    onSuccess: () => {
      queryClient.invalidateQueries('reservation');
      console.log('예약 성공');
      navigate('/mypage');
    },
    onError: (error: AxiosError) => {
      console.log(error.message);
    },
  });

  const decrypt = useDecryptToken();
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!encryptedAccessToken) {
    // navigate('/login');
    return null;
  }
  const accessToken = decrypt(encryptedAccessToken);

  console.log('startDate', currentReservationDate.startDate);
  console.log('endDate', currentReservationDate.endDate);

  const { data: userData, isError } = useGetMe();

  const handleReservationClick = () => {
    const startDate = currentReservationDate.startDate;
    const endDate = currentReservationDate.endDate;

    if (isError) {
      alert('로그인 후 이용해주세요.');
      return null;
    }

    if (
      currentReservationDate.startDate &&
      currentReservationDate.endDate &&
      calculateDateDifference(
        currentReservationDate.startDate,
        currentReservationDate.endDate,
      ) &&
      calculateDateDifference(
        currentReservationDate.startDate,
        currentReservationDate.endDate,
      ) < minimumRentalPeriod
    ) {
      alert('최소 대여 기간보다 짧게 예약할 수 없습니다.');
      return null;
    }
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
      style={{ marginTop: '20px' }}
    />
  );
}
export default ReservationBtn;
