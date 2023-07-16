import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { addInterest, removeInterest } from '../../store/InterestStore';
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
import { INTEREST_KEY } from '../../../pages/Main/constants';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ itemCardData }: { itemCardData: ItemCardProps }) => {
  const navigate = useNavigate();
  const storedInterest = localStorage.getItem(INTEREST_KEY);
  const initialFavorites = storedInterest ? JSON.parse(storedInterest) : [];
  const [interestItems, setInterestItems] =
    useState<string[]>(initialFavorites);
  const dispatch = useDispatch();

  const [interestId, setInterestId] = useState('');

  useEffect(() => {
    localStorage.setItem(INTEREST_KEY, JSON.stringify(interestItems));
  }, [interestItems]);

  const isInterest = interestItems.includes(itemCardData.id);
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
        console.error('removeInterestMutation error:', error);
      },
    },
  );
  const handleHeartClick = () => {
    if (isInterest) {
      removeInterestMutation.mutate(interestId);
      dispatch(removeInterest(interestId));
      setInterestItems(interestItems.filter((id) => id !== itemCardData.id));
    } else {
      addInterestMutation.mutate(itemCardData.id);
      dispatch(addInterest(itemCardData.id));
      setInterestItems([...interestItems, itemCardData.id]);
    }
  };
  const handleItemOnClick = () => {
    navigate(`/detail/${itemCardData.id}`);
  };
  return (
    <ItemCardContainer onClick={handleItemOnClick}>
      <ItemImage src={itemCardData.images}></ItemImage>
      <ItemInfo>
        <ItemName>{itemCardData.title}</ItemName>
        <ItemDescription>{itemCardData.content}</ItemDescription>
        <ItemLocationWrapper>
          <MdLocationOn />
          <span>{itemCardData.address}</span>
        </ItemLocationWrapper>
      </ItemInfo>
      <PriceFavoriteWrapper isHeartClicked={isInterest}>
        <ItemPrice>
          {`최소 대여기간 ${itemCardData.minimumRentalPeriod}일 고정금 ${itemCardData.baseFee}
          만원 / 1일 ${itemCardData.feePerDay}만원`}
        </ItemPrice>
        <BsFillHeartFill onClick={handleHeartClick} />
      </PriceFavoriteWrapper>
    </ItemCardContainer>
  );
};

export default ItemCard;
