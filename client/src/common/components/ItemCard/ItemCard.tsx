import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
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

  const fetchInterestId = async () => {
    const response = await axios.get('https://playpack.shop/members/interests');
    return response.data?.interestId;
  };
  const { data: interestIdData } = useQuery('interestId', fetchInterestId);

  useEffect(() => {
    if (interestIdData) {
      setInterestId(interestIdData);
      setIsHeartClicked(true);
    } else {
      setInterestId('');
      setIsHeartClicked(false);
    }
  }, [interestIdData]);

  const addInterestMutation = useMutation((productId: string) =>
    axios.post('https://playpack.shop/interests', {
      //memberId: '1', // 멤버 id는 임시로 1로 설정
      productId: productId,
    }),
  );

  const removeInterestMutation = useMutation((interestId: string) =>
    axios.delete(`https://playpack.shop/interests?interestId=${interestId}`),
  );

  const handleHeartClick = () => {
    if (isHeartClicked) {
      removeInterestMutation.mutate(interestId);
    } else {
      addInterestMutation.mutate(itemCardData.id);
    }
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
