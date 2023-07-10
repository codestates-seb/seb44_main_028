import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import ModalTitle from './ModalTitle';
import ModalButton from './ModalButton';
import ModalAdditional from './ModalAdditional';
import { ModalMainProps } from '../../type';
import {
  ModalOverlay,
  ModalWrapper,
  ModalInfoWrapper,
} from '../../style/style';

const ModalMain = ({ children, isOpen }: ModalMainProps) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleCloseModal = () => {
    setIsOverlayVisible(false);
  };
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  if (!isOpen) return null;
  return createPortal(
    <>
      {isOverlayVisible && <ModalOverlay onClick={handleCloseModal} />}
      {isOverlayVisible && (
        <ModalWrapper ref={modalRef}>
          <ModalInfoWrapper onClick={handleModalContentClick}>
            {children}
          </ModalInfoWrapper>
        </ModalWrapper>
      )}
    </>,
    document.body,
  );
};

export default Object.assign(ModalMain, {
  Title: ModalTitle,
  Button: ModalButton,
  Additional: ModalAdditional,
});

// 모달 사용하는 방법
// <>
//   <div>Main page</div>
//   <button onClick={handleModalTest}>버튼</button>
//   {isClick && (
//     <ModalMain isOpen={isClick}>
//       <ModalMain.Additional>
//         <MdError />
//       </ModalMain.Additional>
//       <ModalMain.Title>다이슨 예약하시겠습니까?</ModalMain.Title>
//       <div>
//         <ModalMain.Button
//           color="inherit"
//           backgroundColor={colorPalette.modalCancelButtonColor}
//           hoverBackgroundColor={colorPalette.modalCancelHoverColor}
//           onClick={() => setIsClick(false)}
//         >
//           돌아가기
//         </ModalMain.Button>
//         <ModalMain.Button
//           color={colorPalette.whiteColor}
//           backgroundColor={colorPalette.heavyColor}
//           hoverBackgroundColor={colorPalette.rightButtonHoverColor}
//           onClick={() => setIsClick(false)}
//         >
//           예약하기
//         </ModalMain.Button>
//       </div>
//     </ModalMain>
//   )}
// </>
