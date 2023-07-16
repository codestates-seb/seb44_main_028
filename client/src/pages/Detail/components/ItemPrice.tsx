import { ItemPriceContainer } from '../style';
const ItemPrice = ({ itemPrice }: { itemPrice: string }) => {
  return (
    <ItemPriceContainer>
      <div>{itemPrice}</div>
      <div>3시간</div>
    </ItemPriceContainer>
  );
};

export default ItemPrice;
