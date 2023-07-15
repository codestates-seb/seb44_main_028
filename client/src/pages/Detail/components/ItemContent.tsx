import {
  ItemContentContainer,
  ItemInfoWrapper,
  ItemImageWrapper,
  ItemUserWrapper,
  ItemDescriptionWrapper,
  ItemActionBtn,
  ProductInfo,
  ProductTitle,
  ProductContent,
  ProductBtn,
} from '../style';
const ItemContent = () => {
  return (
    <ItemContentContainer>
      <ItemInfoWrapper>
        <ItemImageWrapper>
          <img src="http://www.arpheoworks.com/wp-content/uploads/2015/04/tacotruck_lr3.jpg" />
        </ItemImageWrapper>
        <ItemUserWrapper>
          {/* 유저 정보 */}
          {/* 가격 정보 */}
          {/* 별점 */}
          <ItemActionBtn></ItemActionBtn>
        </ItemUserWrapper>
      </ItemInfoWrapper>
      <ItemDescriptionWrapper>
        <ProductInfo></ProductInfo>
        <ProductTitle></ProductTitle>
        <ProductContent></ProductContent>
        {/* 카테고리 */}
        <ProductBtn></ProductBtn>
      </ItemDescriptionWrapper>
    </ItemContentContainer>
  );
};

export default ItemContent;
