import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { makeDateFilledWithZero } from '../../../common/utils/helperFunctions/makeDateFilledWithZero';
import BigBtn from '../../../common/components/Button';
import { RootState } from '../../../common/store/RootStore';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { ACCESS_TOKEN } from '../../Login/constants';
import { calculateDateDifference } from '../../../common/utils/helperFunctions/calculateDateDifference';
import usePostReservationData from '../../../common/utils/customHooks/usePostReservationData';
import { decryptToken } from '../../../common/utils/helperFunctions/decryptToken';

type ReservationBtnProps = {
  minimumRentalPeriod: number;
};

function ReservationBtn({ minimumRentalPeriod }: ReservationBtnProps) {
  const { itemId } = useParams<{ itemId: string }>();
  // 유저가 선택한 날짜를 가져온다.
  const currentReservationDate = useSelector(
    (state: RootState) => state.reservation,
  );
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const sendReservationData = usePostReservationData();

  const mutation = useMutation(sendReservationData, {
    onSuccess: () => {
      queryClient.invalidateQueries('reservation');
      navigate('/mypage');
    },
    onError: (error: AxiosError) => {
      console.log(error.message);
    },
  });

  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = decryptToken(encryptedAccessToken || '');
  console.log('accessToken', accessToken);

  const handleReservationClick = () => {
    const startDate = currentReservationDate.startDate;
    const endDate = currentReservationDate.endDate;

    if (!startDate || !endDate) {
      alert('날짜를 선택해주세요');
      return;
    }

    if (calculateDateDifference(startDate, endDate) < minimumRentalPeriod) {
      alert('최소 대여 기간보다 짧게 예약할 수 없습니다.');
      return;
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
