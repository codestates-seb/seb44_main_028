import ScrollToTop from '../../../common/components/ScrollToTop';
import Category from '../../../common/components/Category/Category';
import { MainPageContainer } from '../style';
import ItemCardList from '../../../common/components/ItemCard/ItemCardList';
import {
  ITEMCARDLIST_TITLE,
  ITEMCARD_DATA,
  ITEMCARD_DEVELOPMENT_DATA,
} from '../constants';

function MainPage() {
  return (
    <MainPageContainer>
      <Category />
      <ScrollToTop />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[0]}
        itemCardListContentData={ITEMCARD_DATA}
      />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[1]}
        itemCardListContentData={ITEMCARD_DATA}
      />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[2]}
        itemCardListContentData={ITEMCARD_DATA}
      />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE[3]}
        itemCardListContentData={ITEMCARD_DEVELOPMENT_DATA}
      />
    </MainPageContainer>
  );
}
export default MainPage;
