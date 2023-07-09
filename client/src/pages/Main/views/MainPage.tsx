import React from 'react';
import ScrollToTop from '../../../common/components/ScrollToTop';
import Category from '../../../common/components/Category/Category';
import { MainPageContainer } from '../style';
function MainPage() {
  return (
    <MainPageContainer>
      <Category />
      <ScrollToTop />
    </MainPageContainer>
  );
}
export default MainPage;
