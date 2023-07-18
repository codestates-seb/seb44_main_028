import React from 'react';
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
interface Props {
  params: string;
}
const BorrowCard = ({
  borrowCardData,
}: {
  borrowCardData: borrowCardProps;
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/reservations/members`,
        );
        setItems(response.data);
      } catch (error) {
        console.error('아이템을 불러올 수없습니다.', error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const params = borrowCardData.params as string; // 서버에서 내려주는 params 데이터

    try {
      const { startDate, endDate } = processDataWithRegex(params);
      console.log(startDate); // "2023-01"
      console.log(endDate); // "2023-02"
    } catch (error) {
      console.error('날짜 데이터 추출 중 오류가 발생했습니다.', error);
    }
  }, [borrowCardData.params]);
  return (
    <>
      <BorrowCardContainer>
        <BorrowCardWrapper>
          <ImgWrapper>
            <ItemImage src={borrowCardData.images} />
          </ImgWrapper>
          <ContentWrapper>
            <TitleWrapper>{borrowCardData.title}</TitleWrapper>
            <DatesWrapper>
              <div>예약기간</div>
              {borrowCardData.status === 'CANCELED' ? (
                <div>{`${startDate}`}</div>
              ) : (
                <div>{`${startDate} - ${endDate}`}</div>
              )}
            </DatesWrapper>
            {borrowCardData.status === 'REQUESTED' && (
              <ButtonWapper>
                <DefaultBtn
                  color={colorPalette.whiteColor}
                  backgroundColor={colorPalette.cancleButtonColor}
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
