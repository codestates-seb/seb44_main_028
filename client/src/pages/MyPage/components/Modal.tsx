import React, { useState } from 'react';
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
      {isOpen && (
        <ModalWrapper>
          <div>{children}</div>
          <RatingStar
            ratingIndex={ratingIndex}
            setRatingIndex={setRatingIndex}
          />
          <ButtonWapper>
            <Close onClick={handleGoBack}>돌아가기</Close>
            <Rating onClick={handleGiveRating}>별점 주기</Rating>
          </ButtonWapper>
        </ModalWrapper>
      )}
      <div>
        <ButtonWapper2>
          <Rating onClick={handleOpenModal}>별점 주기</Rating>
        </ButtonWapper2>
      </div>
    </>
  );
}

export default Modal;
