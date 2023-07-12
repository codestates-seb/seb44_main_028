import { useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
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
  const [interestId, setInterestId] = useState('');

  const addInterestMutation = useMutation((productId: string) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/members/interests`, {
        memberId: '1',
        productId: productId,
      })
      .then((res) => {
        const { data } = res;
        setInterestId(data.interestId);
      }),
  );

  const removeInterestMutation = useMutation(
    (interestId: string) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/api/members/interests`, {
        data: {
          memberId: '1', // 멤버 id는 임시로 1로 설정
          interestId: interestId,
        },
      }),
    {
      onError: (error) => {
        // 에러 처리 로직 추가
        console.error('removeInterestMutation error:', error);
      },
    },
  );
  const handleHeartClick = () => {
    if (isHeartClicked) {
      removeInterestMutation.mutate(interestId);
    } else {
      addInterestMutation.mutate(itemCardData.id);
    }
    setIsHeartClicked(!isHeartClicked);
  };

  return (
    <ItemCardContainer>
      <ItemImage src={itemCardData.imageUrl}></ItemImage>
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
