import React from 'react';
import ScrollToTop from '../../../common/components/ScrollToTop';
import Category from '../../../common/components/Category/Category';
import { MainPageContainer } from '../style';
import ItemCardList from '../../../common/components/ItemCard/ItemCardList';
import { ITEMCARDLIST_TITLE, ITEMCARD_DATA } from '../constants';
function MainPage() {
  return (
    <MainPageContainer>
      <Category />
      <ScrollToTop />
      <ItemCardList
        itemCardListTitle={ITEMCARDLIST_TITLE}
        itemCardListContentData={ITEMCARD_DATA}
      />
    </MainPageContainer>
  );
}
export default MainPage;
