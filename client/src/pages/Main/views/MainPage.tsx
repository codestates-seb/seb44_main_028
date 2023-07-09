import { useState } from 'react';
import ModalMain from '../../../common/components/Modal/ModalMain';
import ScrollToTop from '../../../common/components/ScrollToTop';

function MainPage() {
  const [isClick, setIsClick] = useState(false);
  const handleModalTest = () => {
    setIsClick(!isClick);
  };
  return (
    <>
      <div>Main page</div>
      <button onClick={handleModalTest}>버튼</button>
      {isClick && <ModalMain isOpen={isClick} />}
      <ScrollToTop />
    </>
  );
}
export default MainPage;
