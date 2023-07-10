import { ItemListPageContainer, ItemFilterWrapper } from '../style';
import SelectBox from '../../../common/components/SelectBox';
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
    </ItemListPageContainer>
  );
}
export default ItemListPage;
