import SelectBox from '../../../common/components/SelectBox';
import {
  DISTANCE_DEFAULT_VALUE,
  DISTANCE_OPTIONS,
  PRODUCT_FILTER_OPTIONS,
} from '../../../common/constants';
import { SearchPageContainer, SearchProductListWrapper } from '../style';
const SearchPage = () => {
  return (
    <SearchPageContainer>
      <div>
        <SelectBox
          selectOptionData={DISTANCE_OPTIONS}
          selectDefaultOption={DISTANCE_DEFAULT_VALUE}
        />
        <SelectBox selectOptionData={PRODUCT_FILTER_OPTIONS} />
      </div>
      <SearchProductListWrapper></SearchProductListWrapper>
    </SearchPageContainer>
  );
};

export default SearchPage;
