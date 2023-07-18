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

const BorrowCard = ({
  title,
  startDate,
  endDate,
  status,
  image,
}: borrowCardProps) => {
  const [items, setItems] = useState([] as borrowCardProps[]);

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

  return (
    <>
      <BorrowCardContainer>
        <BorrowCardWrapper>
          <ImgWrapper>
            <ItemImage src={image} />
          </ImgWrapper>
          <ContentWrapper>
            <TitleWrapper>{title}</TitleWrapper>
            <DatesWrapper>
              <div>예약기간</div>
              {status === 'CANCELED' ? (
                <div>{`${startDate}`}</div>
              ) : (
                <div>{`${startDate} - ${endDate}`}</div>
              )}
            </DatesWrapper>
            {status === 'REQUESTED' && (
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
