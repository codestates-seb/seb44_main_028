import { colorPalette } from '../../utils/enum/colorPalette';
import { useEffect, useState } from 'react';
import { DefaultBtn } from '../Button';
import { borrowCardProps } from '../../type';
import { processDataWithRegex } from '../../utils/helperFunctions/processDataWithRegex';
import axios from 'axios';
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
import { useParams } from 'react-router-dom';
import BorrowList from '../../../pages/MyPage/components/BorrowList';
import { set } from 'immer/dist/internal';

const BorrowCard = ({
  borrowCardData,
}: {
  borrowCardData: borrowCardProps;
}) => {
  const reservationId = useParams();
  const [items, setItems] = useState([] as borrowCardProps[]);
  const [canceled, setCanceled] = useState([]);

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

  useEffect(() => {
    reservationCancel();
  }, [BorrowList]);

  const reservationCancel = async () => {
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
  const handleBorrowCancel = () => {
    reservationCancel();
  };

  //상품 취소를 누르면 상품이 cancel에 추가되고, 예약내역에 있는 상품은 삭제되어야 함
  // const handleCancelClick = (reservationId: string) => {
  //   const itemIndex = items.findIndex((item) => item.reservationId === reservationId);

  //   if (itemIndex !== -1) {
  //     // 상품이 이미 예약내역에 있는 경우
  //     setItems((prevItems) => {
  //       const updatedItems = [...prevItems];
  //       const updatedItem = { ...updatedItems[itemIndex] };
  //       updatedItem.quantity -= 1;

  //       if (updatedItem.quantity <= 0) {
  //         // 수량이 0 이하면 예약내역에서 삭제
  //         updatedItems.splice(itemIndex, 1);
  //       } else {
  //         updatedItems[itemIndex] = updatedItem;
  //       }

  //       return updatedItems;
  //     });
  //   } else {
  //     // 상품이 새로 추가되는 경우
  //     setCanceled((prevCanceled) => [
  //       ...prevCanceled,
  //       { reservationId: reservationId, quantity: 1 },
  //     ]);
  //   }
  // };
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
              <div>예약기간</div>
              {borrowCardData.status === 'CANCELED' ? (
                <div>{`${borrowCardData.startDate}`}</div>
              ) : (
                <div>{`${borrowCardData.startDate} - ${borrowCardData.endDate}`}</div>
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
