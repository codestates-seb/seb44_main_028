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
} from '../../style/style';
import { ItemCardProps } from '../../type';
const ItemCard = ({ itemCardData }: { itemCardData: ItemCardProps }) => {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const handleHeartClick = () => {
    setIsHeartClicked(!isHeartClicked);
  };
  return (
    <ItemCardContainer>
      <ItemImage src="https://image.newdaily.co.kr/site/data/img/2019/12/03/2019120300097_0.jpg"></ItemImage>
      <ItemInfo>
        <ItemName>{itemCardData.title}</ItemName>
        <ItemDescription>{itemCardData.content}</ItemDescription>
        <ItemLocationWrapper>
          <MdLocationOn />
          <span>{itemCardData.location}</span>
        </ItemLocationWrapper>
      </ItemInfo>
      <PriceFavoriteWrapper isHeartClicked={isHeartClicked}>
        <ItemPrice>
          {`최소 대여기간 ${itemCardData.minimumRentalPeriod}일 고정금 ${itemCardData.baseFee}
          만원 / ${itemCardData.feePerDay}일 ${itemCardData.overdueFee}만원`}
        </ItemPrice>
        <BsFillHeartFill onClick={handleHeartClick} />
      </PriceFavoriteWrapper>
    </ItemCardContainer>
  );
};

export default ItemCard;
