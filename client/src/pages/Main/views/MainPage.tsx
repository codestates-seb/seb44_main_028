import { useState } from 'react';
import ModalMain from '../../../common/components/Modal/ModalMain';
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
  // const [isClick, setIsClick] = useState(false);
  // const handleModalTest = () => {
  //   setIsClick(!isClick);
  // };
  return (
    //  <>
    //     <div>Main page</div>
    //     {/* <button onClick={handleModalTest}>버튼</button>
    //     {isClick && (
    //       <ModalMain isOpen={isClick}>
    //         <ModalMain.Title>다이슨 예약하시겠습니까?</ModalMain.Title>
    //         <ModalMain.Button onClick={() => setIsClick(false)}>
    //           돌아가기
    //         </ModalMain.Button>
    //         <ModalMain.Button>예약하기</ModalMain.Button>
    //       </ModalMain>
    //     )} */}
    //   </>

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
