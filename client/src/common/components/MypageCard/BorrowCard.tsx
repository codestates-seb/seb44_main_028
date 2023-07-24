import { colorPalette } from '../../utils/enum/colorPalette';
import { useEffect, useState } from 'react';
import { DefaultBtn } from '../Button';
import { borrowCardProps } from '../../type';
import { processDataWithRegex } from '../../utils/helperFunctions/processDataWithRegex';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import {
  BorrowCardWrapper,
  DatesWrapper,
  ButtonWapper,
  TitleWrapper,
  ImgWrapper,
  ContentWrapper,
  ItemImage,
  BorrowCardContainer,
} from '../../style/style';
import useDecryptToken from '../../utils/customHooks/useDecryptToken';
import { ACCESS_TOKEN } from '../../constants';

const BorrowCard = ({
  borrowCardData,
}: {
  borrowCardData: borrowCardProps;
}) => {
  const now = dayjs();

  const [items, setItems] = useState([] as borrowCardProps[]);
  const [canceled, setCanceled] = useState(false);

  const decrypt = useDecryptToken();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reservations/members`,
        );
        const processedItems = response.data.map((item: borrowCardProps) => {
          const { startDate, endDate } = processDataWithRegex(item.startDate);
          return { ...item, startDate, endDate };
        });

        setItems(processedItems);
      } catch (error) {
        console.error('아이템을 불러올 수없습니다.', error);
      }
    };
    fetchItems();
  }, []);

  const reservationCancel = async (reservationId: string) => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN) || '';
    const accessToken = decrypt(encryptedAccessToken);

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/reservations/${reservationId}/cancel`,
        { params: { status: 'CANCELED' } },
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      //get 요청으로 취소 내역 가져오기
      // 취소 요청 후 items 배열을 업데이트하고 해당 상품을 'CANCELED' 상태로 변경합니다.
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.reservationId === reservationId
            ? { ...item, status: 'CANCELED' }
            : item,
        ),
      );
    } catch (error) {
      console.error('취소 요청을 보내는데 실패했습니다.', error);
    }
  };

  const handleBorrowCancel = () => {
    if (borrowCardData.reservationId) {
      reservationCancel(borrowCardData.reservationId);
    } else {
      console.error('reservationId가 없습니다.');
    }
  };

  return (
    <>
      <BorrowCardContainer>
        <BorrowCardWrapper>
          <ImgWrapper>
            <ItemImage src={borrowCardData.image} />
          </ImgWrapper>
          <ContentWrapper>
            <TitleWrapper>{borrowCardData.title}</TitleWrapper>
            <DatesWrapper>
              {borrowCardData.status === 'CANCELED' ? (
                <>
                  <div>취소된 날짜</div>
                  <div>
                    <span className="product-date">
                      {now.format('YYYY.MM.DD')}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>예약기간</div>
                  <div>{`${borrowCardData.startDate} - ${borrowCardData.endDate}`}</div>
                </>
              )}
            </DatesWrapper>

            {/* <ButtonWapper>
              <DefaultBtn
                color={colorPalette.whiteColor}
                backgroundColor={colorPalette.cancleButtonColor}
                onClick={handleBorrowCancel}
              >
                취소요청
              </DefaultBtn>
            </ButtonWapper> */}

            {borrowCardData.status === 'COMPLETED' && (
              <DefaultBtn
                color={colorPalette.whiteColor}
                backgroundColor={colorPalette.accentColor}
              >
                별점 주기
              </DefaultBtn>
            )}
            {borrowCardData.status === 'REQUESTED' && (
              <ButtonWapper>
                <DefaultBtn
                  color={colorPalette.whiteColor}
                  backgroundColor={colorPalette.cancleButtonColor}
                  onClick={handleBorrowCancel}
                >
                  취소요청
                </DefaultBtn>
              </ButtonWapper>
            )}
          </ContentWrapper>
        </BorrowCardWrapper>
      </BorrowCardContainer>
    </>
  );
};
export default BorrowCard;
