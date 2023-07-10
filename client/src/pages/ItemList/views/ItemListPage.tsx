import SelectBox from '../../../common/components/SelectBox';
import ItemCardList from '../../../common/components/ItemCard/ItemCardList';
import { ITEMCARD_DATA } from '../../Main/constants';
import { ItemListPageContainer, ItemFilterWrapper } from '../style';

import {
  DISTANCE_DEFAULT_VALUE,
  DISTANCE_OPTIONS,
  PRODUCT_FILTER_OPTIONS,
} from '../../../common/constants';
function ItemListPage() {
  return (
    <ItemListPageContainer>
      <ItemFilterWrapper>
        <SelectBox
          selectOptionData={DISTANCE_OPTIONS}
          selectDefaultOption={DISTANCE_DEFAULT_VALUE}
        />
        <SelectBox selectOptionData={PRODUCT_FILTER_OPTIONS} />
      </ItemFilterWrapper>
      <ItemCardList itemCardListContentData={ITEMCARD_DATA} />
    </ItemListPageContainer>
  );
}
export default ItemListPage;
