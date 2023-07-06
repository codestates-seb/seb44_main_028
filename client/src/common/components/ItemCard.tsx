import React, { useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import {
  ItemCardContainer,
  ItemImage,
  ItemInfo,
  ItemName,
  ItemDescription,
  ItemLocationWrapper,
  ItemPrice,
  PriceFavoriteWrapper,
} from '../style/style';
const ItemCard = () => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };
  return (
    <ItemCardContainer>
      <ItemImage src="https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg"></ItemImage>
      <ItemInfo>
        <ItemName>다이슨 빌려줍니다.</ItemName>
        <ItemDescription>
          에어랩 빌려가실 분? 다이슨은 영국의 기업으로...
        </ItemDescription>
        <ItemLocationWrapper>
          <MdLocationOn />
          <span>동대문구 마장동</span>
        </ItemLocationWrapper>
      </ItemInfo>
      <PriceFavoriteWrapper isHeartClicked={isHeartClicked}>
        <ItemPrice>최소 대여기간 3일 고정금 5만원 / 1일 1만원</ItemPrice>
        <BsFillHeartFill onClick={handleHeartClick} />
      </PriceFavoriteWrapper>
    </ItemCardContainer>
  );
};

export default ItemCard;
