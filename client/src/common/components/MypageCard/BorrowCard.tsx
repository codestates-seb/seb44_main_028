import { Button } from '@mui/base';
import { red } from '@mui/material/colors';
import React from 'react';
import { colorPalette } from '../../utils/enum/colorPalette';
import {
  CardWrapper,
  DatesWrapper,
  ButtonWapper,
  TitleWrapper,
  ImgWrapper,
  ContentWrapper,
} from '../../style/style';
import { DefaultBtn } from '../Button';

const BorrowCard = () => {
  return (
    <>
      <CardWrapper>
        <ImgWrapper></ImgWrapper>
        <ContentWrapper>
          <TitleWrapper>감자 빌려드려요</TitleWrapper>
          <DatesWrapper>
            <div>예약기간</div>
            <div>2023.07.09 - 2023.07.11</div>
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
