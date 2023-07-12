import React, { useState } from 'react';
import ModalMain from '../../../common/components/Modal/ModalMain';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import {
  ModalWrapper,
  Close,
  Rating,
  ButtonWapper,
  ButtonWapper2,
} from '../style';
import { ModalType } from '../type';
import RatingStar from './RatingStar';

function Modal({ children, setIsOpen }: ModalType) {
  const [ratingIndex, setRatingIndex] = useState(1);
  const [isOpen, setIsOpenModal] = useState(false);

  //const [isClick, setIsClick] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleGoBack = () => {
    handleCloseModal();
    setIsOpen(false);
  };

  const handleGiveRating = () => {
    // 서버로 전송 될 코드 추가
    console.log('별점 전송:', ratingIndex);
    handleCloseModal();
    setIsOpen(false);
  };

  return (
    <>
      {/* 별점 주기 모달 이런 식으로 사용하시면 됩니다~ */}
      {/* {isOpen && (
        <ModalMain isOpen={isOpen}>
          <ModalMain.Additional>
            <RatingStar
              ratingIndex={ratingIndex}
              setRatingIndex={setRatingIndex}
            />
          </ModalMain.Additional>
          <ModalMain.Title>다이슨 예약하시겠습니까?</ModalMain.Title>
          <div>
            <ModalMain.Button
              color="inherit"
              backgroundColor={colorPalette.modalCancelButtonColor}
              hoverBackgroundColor={colorPalette.modalCancelHoverColor}
              onClick={() => setIsOpenModal(false)}
            >
              돌아가기
            </ModalMain.Button>
            <ModalMain.Button
              color={colorPalette.whiteColor}
              backgroundColor={colorPalette.heavyColor}
              hoverBackgroundColor={colorPalette.rightButtonHoverColor}
              onClick={() => setIsOpenModal(false)}
            >
              예약하기
            </ModalMain.Button>
          </div>
        </ModalMain>
      )} */}
      <div>
        <ButtonWapper2>
          <Rating onClick={handleOpenModal}>별점 주기</Rating>
        </ButtonWapper2>
      </div>
    </>
  );
}

export default Modal;
