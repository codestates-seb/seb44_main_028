import { useState } from 'react';
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
import {
  ITEM_DISCRIPRION,
  ITEM_PRICE,
  ITEM_TITLE,
  ITEM_TAG,
  ITEM_NOTICE,
  USER_BTN,
} from '../constants';

const ItemContent = () => {
  const [ratingIndex, setRatingIndex] = useState(3);
  const handleReservation = () => {
    console.log('예약하기');
  };
  return (
    <ItemContentContainer>
      <ItemInfoWrapper>
        <ItemImageWrapper>
          <img src="https://pbs.twimg.com/media/FsD7uO8aUAALFPR.jpg:large" />
        </ItemImageWrapper>
        <ItemUserWrapper>
          {/* 유저 정보 */}
          <ItemUserInfo />
          {/* 가격 정보 */}
          {ITEM_PRICE.map((price, index) => (
            <ItemPrice key={index} itemPrice={price} />
          ))}
          {/* 별점 */}
          <p className="rate">상품 별점</p>
          <ItemRate>
            <RatingStar
              ratingIndex={ratingIndex}
              setRatingIndex={setRatingIndex}
            />
          </ItemRate>
          <ItemActionBtn>
            <BigDefaultBtn
              color={colorPalette.whiteColor}
              backgroundColor={colorPalette.heavyColor}
              hoverBackgroundColor={colorPalette.rightButtonHoverColor}
              height={64}
              width={228}
              onClick={handleReservation}
            >
              예약하기
            </BigDefaultBtn>
            <div>채팅아이콘</div>
          </ItemActionBtn>
        </ItemUserWrapper>
      </ItemInfoWrapper>
      <ItemDescriptionWrapper>
        <ProductInfo>
          <div>상품정보</div>
          <div></div>
        </ProductInfo>
        <ProductDescription>
          <ProductTitle>{ITEM_TITLE}</ProductTitle>
          <ProductContent>{ITEM_DISCRIPRION}</ProductContent>
          <ProductNotice>{ITEM_NOTICE}</ProductNotice>
          {/* 카테고리 */}
          <ItemTagSection>
            {ITEM_TAG.map((tag, index) => (
              <ItemTag key={index} itemtag={tag} />
            ))}
          </ItemTagSection>
          <ProductBtn>
            <div>{USER_BTN[0]}</div>
            <div>{USER_BTN[1]}</div>
          </ProductBtn>
        </ProductDescription>
      </ItemDescriptionWrapper>
    </ItemContentContainer>
  );
};

export default ItemContent;
