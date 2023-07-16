import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
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

const ItemContent = () => {
  const [ratingIndex, setRatingIndex] = useState(3);
  const navigate = useNavigate();
  const param = useParams();

  const handleReservation = () => {
    navigate(`/booking/${param.itemId}`);
  };
  const handleChatting = () => {
    navigate(`/chatting/${param.itemId}`);
  };
  const handleUpdate = () => {
    navigate(`/update/${param.itemId}`);
  };
  const handleDelete = () => {
    console.log('삭제');
  };
  const { data, isLoading, error } = useQuery('productDtail', async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/products/018cc66f-9361-4fff-8a41-87ed5fd50d4b`,
    );
    console.log(data);
    return data;
  });
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <ItemContentContainer>
      <ItemInfoWrapper>
        <ItemImageWrapper>
          <img src={data.images[0]} />
        </ItemImageWrapper>
        <ItemUserWrapper>
          {/* 유저 정보 */}
          <ItemUserInfo userName={data.username} address={data.address} />
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
            <ChatBtn />
          </ItemActionBtn>
        </ItemUserWrapper>
      </ItemInfoWrapper>
      <ItemDescriptionWrapper>
        <ProductInfo>
          <div>상품정보</div>
          <div></div>
        </ProductInfo>
        <ProductDescription>
          <ProductTitle>{data.title}</ProductTitle>
          <ProductContent>{data.content}</ProductContent>
          <ProductNotice>{ITEM_NOTICE}</ProductNotice>
          {/* 카테고리 */}
          <ItemTagSection>
            {/* {data.categories.map((tag) => (
              <ItemTag key={tag.categoryId} itemtag={tag.title} />
            ))} */}
          </ItemTagSection>
          <ProductBtn>
            <div onClick={handleUpdate}>{USER_BTN[0]}</div>
            <div onClick={handleDelete}>{USER_BTN[1]}</div>
          </ProductBtn>
        </ProductDescription>
      </ItemDescriptionWrapper>
    </ItemContentContainer>
  );
};

export default ItemContent;
