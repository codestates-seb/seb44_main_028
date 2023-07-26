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
import { useNavigate } from 'react-router-dom';
import useDecryptToken from '../../utils/customHooks/useDecryptToken';
import { ACCESS_TOKEN } from '../../constants';
import { IInterest } from '../../model/IInterest';
import useGetMe from '../../utils/customHooks/useGetMe';
import { addressForMatter } from '../../../pages/MyPage/helper/addressForMatter';

const ItemCard = ({ itemCardData }: { itemCardData: ItemCardProps }) => {
  const navigate = useNavigate();
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const { data: userData } = useGetMe();

  useEffect(() => {
    setIsHeartClicked(isHeartClicked);
  }, [isHeartClicked]);

  useEffect(() => {
    const decrypt = useDecryptToken();
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);
    if (encryptedAccessToken) {
      const decryptedToken = decrypt(encryptedAccessToken);
      setAccessToken(decryptedToken);
    }
  }, []);

  const { data: interestItems, refetch } = useQuery(
    'interests',
    () =>
      axios.get(`${process.env.REACT_APP_API_URL}/api/members/interests/find`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      enabled: !!accessToken,
    },
  );
  const addInterestMutation = useMutation((productId: string) =>
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/members/interests`,
        {
          productId: productId,
          memberId: String(userData?.memberId),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        setIsHeartClicked(true);
        refetch();
      }),
  );

  const removeInterestMutation = useMutation(
    (interestId: string) =>
      axios.delete(`${process.env.REACT_APP_API_URL}/api/members/interests`, {
        data: {
          memberId: String(userData?.memberId),
          interestId: interestId,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    {
      onError: (error) => {
        console.error('removeInterestMutation error:', error);
      },
      onSettled: () => {
        setIsHeartClicked(false);
        refetch();
      },
    },
  );
  useEffect(() => {
    if (interestItems && interestItems.data.responses) {
      const interestList = interestItems.data.responses.find(
        (interestItem: IInterest) =>
          interestItem.productId === itemCardData.productId,
      );
      setIsHeartClicked(!!interestList);
    }
  }, [interestItems, itemCardData.productId]);
  const handleHeartClick = async () => {
    if (!userData) {
      navigate('/login');
      return;
    }
    if (!interestItems) {
      return;
    }
    const interestList = interestItems.data.responses.find(
      (interestItem: IInterest) =>
        interestItem.productId === itemCardData.productId,
    );

    if (interestList) {
      removeInterestMutation.mutate(interestList.interestId);
    } else {
      addInterestMutation.mutate(itemCardData.productId);
    }
  };

  const handleItemOnClick = () => {
    navigate(`/detail/${itemCardData.productId}`);
  };
  return (
    <ItemCardContainer>
      <ItemImage
        src={itemCardData.image}
        onClick={handleItemOnClick}
      ></ItemImage>
      <ItemInfo>
        <ItemName>{itemCardData.title}</ItemName>
        <ItemDescription>{itemCardData.content}</ItemDescription>
        <ItemLocationWrapper>
          <MdLocationOn />
          <span>{addressForMatter(itemCardData.address)}</span>
        </ItemLocationWrapper>
      </ItemInfo>
      <PriceFavoriteWrapper isHeartClicked={isHeartClicked}>
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
