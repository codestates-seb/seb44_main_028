import React from 'react';
import { colorPalette } from '../../utils/enum/colorPalette';
import { useEffect, useState } from 'react';
import { DefaultBtn } from '../Button';
import { BorrowCardProps } from '../../type';
import axios from 'axios';
import {
  CardWrapper,
  DatesWrapper,
  ButtonWapper,
  TitleWrapper,
  ImgWrapper,
  ContentWrapper,
  ItemImage,
} from '../../style/style';

const BorrowCard = ({ itemCardData }: { itemCardData: BorrowCardProps }) => {
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
      const start = '2023.07.09';
      const end = '2023.07.11';
      setStartDate(start);
      setEndDate(end);
    };
    fetchDates();
  }, []);

  return (
    <>
      <CardWrapper>
        <ImgWrapper>
          <ItemImage src={itemCardData.images} />
        </ImgWrapper>
        <ContentWrapper>
          <TitleWrapper>{itemCardData.title}</TitleWrapper>
          <DatesWrapper>
            <div>예약기간</div>
            <div>{`${startDate} - ${endDate}`}</div>
          </DatesWrapper>
          <ButtonWapper>
            <DefaultBtn
              color={colorPalette.whiteColor}
              backgroundColor={colorPalette.deepMintColor}
            >
              예약 확정
            </DefaultBtn>
            <DefaultBtn
              color={colorPalette.whiteColor}
              backgroundColor={colorPalette.cancleButtonColor}
            >
              거절 하기
            </DefaultBtn>
          </ButtonWapper>
        </ContentWrapper>
      </CardWrapper>
    </>
  );
};
export default BorrowCard;
