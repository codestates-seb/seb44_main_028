import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { GrFormView } from 'react-icons/gr';
import ItemUserInfo from './ItemUserInfo';
import ItemPrice from './ItemPrice';
import RatingStar from '../../MyPage/components/RatingStar';
import BigDefaultBtn from '../../../common/components/Button';
import ItemTag from './ItemTag';
import {
  ItemContentContainer,
  ItemInfoWrapper,
  ItemImageWrapper,
  ItemUserWrapper,
  ItemDescriptionWrapper,
  ItemRate,
  ItemTagSection,
  ItemActionBtn,
  ProductView,
  ProductDescription,
  ProductInfo,
  ProductTitle,
  ProductContent,
  ProductNotice,
  ProductBtn,
} from '../style';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { ITEM_PRICE, ITEM_TAG, ITEM_NOTICE, USER_BTN } from '../constants';
import Loading from '../../../common/components/Loading';
import ErrorPage from '../../../common/components/ErrorPage';
import ChatBtn from './ChatBtn';
import { ICategory } from '../type';
import ImageCarousel from './ImageCarousel';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import { ACCESS_TOKEN } from '../../Login/constants';
import { useDispatch } from 'react-redux';
import { createLenderInfo } from '../store/CurrentLenderInfo';
import { addressForMatter } from '../../MyPage/helper/addressForMatter';

const ItemContent = () => {
  const { data: userData, isError } = useGetMe();
  console.log(userData);
  const [ratingIndex, setRatingIndex] = useState(3);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const decrypt = useDecryptToken();
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);
    if (encryptedAccessToken) {
      const decryptedToken = decrypt(encryptedAccessToken);
      setAccessToken(decryptedToken);
    }
  }, []);
  console.log(param.itemId);
  const handleReservation = () => {
    if (isError) {
      console.log('로그인 후 이용해주세요.');
      alert('로그인 후 이용해주세요.');
    } else {
      navigate(`/booking/${param.itemId}`);
    }
  };
  const handleChatting = () => {
    navigate(`/chatting/${param.itemId}`);
  };
  const handleUpdate = () => {
    navigate(`/update/${param.itemId}`);
  };
  const removeItem = useMutation(
    (productId: string | undefined) =>
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const { data } = res;
          console.log(data);
        }),
    {
      onError: (error) => {
        console.error('removeItem error:', error);
      },
    },
  );

  const handleDelete = () => {
    removeItem.mutate(param.itemId);
    setItemData(null);
    navigate(`/`);
  };
  const { data, isLoading, error } = useQuery('productDtail', async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/${param.itemId}`,
    );
    console.log('update', data);
    return data;
  });
  useEffect(() => {
    setItemData(data);
    console.log(itemData);
  }, [data]);
  const [itemData, setItemData] = useState(data);
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }
  console.log('updateData', data.username);
  console.log('updateData', data.userImage);
  dispatch(
    createLenderInfo({ displayName: data.username, imageUrl: data.userImage }),
  );

  return (
    <ItemContentContainer>
      {itemData && (
        <>
          <ItemInfoWrapper>
            {/* <ItemImageWrapper images={data.images}> */}
            <ItemImageWrapper>
              <ImageCarousel images={data.productImages} />
            </ItemImageWrapper>
            <ItemUserWrapper>
              {/* 유저 정보 */}
              <ItemUserInfo
                userName={data.username}
                address={addressForMatter(data.address)}
                userImage={data.userImage}
              />
              {/* 가격 정보 */}

              <ItemPrice
                itemKey={ITEM_PRICE[0]}
                itemValue={data.minimumRentalPeriod}
              />
              <ItemPrice itemKey={ITEM_PRICE[1]} itemValue={data.baseFee} />
              <ItemPrice itemKey={ITEM_PRICE[2]} itemValue={data.feePerDay} />
              <ItemPrice itemKey={ITEM_PRICE[3]} itemValue={data.overdueFee} />

              {/* 별점 */}
              <p className="rate">상품 별점</p>
              <ItemRate>
                <RatingStar
                  ratingIndex={data.rate}
                  setRatingIndex={setRatingIndex}
                />
              </ItemRate>
              <ItemActionBtn>
                <BigDefaultBtn
                  color={colorPalette.whiteColor}
                  backgroundColor={colorPalette.heavyColor}
                  hoverBackgroundColor={colorPalette.rightButtonHoverColor}
                  height={64}
                  width={198}
                  onClick={handleReservation}
                >
                  예약하기
                </BigDefaultBtn>
                {/* <ChatBtn /> */}
              </ItemActionBtn>
            </ItemUserWrapper>
          </ItemInfoWrapper>
          <ItemDescriptionWrapper>
            <ProductInfo>
              <div>상품정보</div>
              <div></div>
            </ProductInfo>
            <ProductView>
              <GrFormView />
              <div>{data.viewCount}</div>
            </ProductView>
            <ProductDescription>
              <ProductTitle>{data.title}</ProductTitle>
              <ProductContent>{data.content}</ProductContent>
              <ProductNotice>{ITEM_NOTICE}</ProductNotice>
              {/* 카테고리 */}
              <ItemTagSection>
                {data?.categories.map((tag: ICategory) => (
                  <ItemTag key={tag.categoryId} itemtag={tag.title} />
                ))}
              </ItemTagSection>
              <ProductBtn>
                {userData?.memberId === data.ownerMemberId ? (
                  <>
                    <div onClick={handleUpdate}>{USER_BTN[0]}</div>
                    <div onClick={handleDelete}>{USER_BTN[1]}</div>
                  </>
                ) : (
                  <div></div>
                )}
              </ProductBtn>
            </ProductDescription>
          </ItemDescriptionWrapper>
        </>
      )}
    </ItemContentContainer>
  );
};

export default ItemContent;
