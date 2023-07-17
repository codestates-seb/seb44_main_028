import React from 'react';
import { colorPalette } from '../../utils/enum/colorPalette';
import { useEffect, useState } from 'react';
import { DefaultBtn } from '../Button';
import { borrowCardProps } from '../../type';
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
    const fetchDates = () => {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7);
      setStartDate(startDate.toISOString().split('T')[0]);
      setEndDate(endDate.toISOString().split('T')[0]);
    };
    fetchDates();
  }, []);
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
