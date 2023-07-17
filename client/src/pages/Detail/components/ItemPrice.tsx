import { ItemPriceContainer } from '../style';
import { ItemPriceProps } from '../type';
const ItemPrice = ({ itemKey, itemValue }: ItemPriceProps) => {
  return (
    <ItemPriceContainer>
      <div>{itemKey}</div>
      <div>{itemValue}</div>
    </ItemPriceContainer>
  );
};

export default ItemPrice;
