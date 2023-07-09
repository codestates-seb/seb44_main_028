import { useState } from 'react';
import ModalMain from '../../../common/components/Modal/ModalMain';
import ScrollToTop from '../../../common/components/ScrollToTop';

function MainPage() {
  // const [isClick, setIsClick] = useState(false);
  // const handleModalTest = () => {
  //   setIsClick(!isClick);
  // };
  return (
    <>
      <div>Main page</div>
      {/* <button onClick={handleModalTest}>버튼</button>
      {isClick && (
        <ModalMain isOpen={isClick}>
          <ModalMain.Title>다이슨 예약하시겠습니까?</ModalMain.Title>
          <ModalMain.Button onClick={() => setIsClick(false)}>
            돌아가기
          </ModalMain.Button>
          <ModalMain.Button>예약하기</ModalMain.Button>
        </ModalMain>
      )} */}
      <ScrollToTop />
    </>
  );
}
export default MainPage;
