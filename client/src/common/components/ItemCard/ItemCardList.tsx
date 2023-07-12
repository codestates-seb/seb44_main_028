import { ItemCardListWrapper, ItemCardWrapper } from '../../style/style';
import { ItemCardListProps } from '../../type';
import ItemCard from './ItemCard';

const ItemCardList = ({
  itemCardListTitle,
  itemCardListContentData,
}: ItemCardListProps) => {
  console.log(itemCardListContentData);
  return (
    <ItemCardListWrapper>
      <p>{itemCardListTitle}</p>
      <ItemCardWrapper>
        {itemCardListContentData.map((itemcard) => (
          <ItemCard itemCardData={itemcard} />
        ))}
      </ItemCardWrapper>
    </ItemCardListWrapper>
  );
};

export default ItemCardList;
