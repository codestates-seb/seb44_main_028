import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import UploadImage from '../components/UploadImage';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import {
  WritePostContainer,
  PriceInput,
  WritePriceWrapper,
  ButtonWrapper,
  CheckBoxTitle,
  Input,
} from '../style';
import { CONTENT_DESCRIPTION } from '../constants';
import ModalMain from '../../../common/components/Modal/ModalMain';
import axios from 'axios';
import { useMutation } from 'react-query';

const WritePost = () => {
  const navigate = useNavigate();
  const [selectedtCategory, setSelectedCategory] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [inputValues, setInputValues] = useState({
    title: '',
    baseFee: '',
    feePerDay: '',
    images: [] as File[],
    minRentalPeriod: '',
    content: '',
    categoryIds: [] as string[],
  });
  const handleQuillChange = (value: string) => {
    const strippedValue = value.replace(/<\/?[^>]+(>|$)/g, '');
    setInputValues((prev) => ({
      ...prev,
      content: strippedValue,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let newValue: string | number;

    if (e.target.name === 'minRentalPeriod') {
      newValue = /^\d+$/.test(inputValue) ? Number(inputValue) : '';
    } else {
      newValue = inputValue;
    }

    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: newValue,
    }));
  };
  const handleCancel = () => {
    setShowModal(!showModal);
  };
  const handelExit = () => {
    navigate('/');
  };
  // const newPost = useMutation((post: object) =>
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/api/products`,
  //       JSON.stringify(post),
  //     )
  //     .then((res) => {
  //       const { data } = res;
  //       console.log('data', data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     }),
  // );
  const onSubmit = (data: object) => {
    const submitData = {
      ...data,
      content: inputValues.content,
    };
    console.log(inputValues);
    // newPost.mutate(inputValues);
  };
  useEffect(() => {
    setInputValues({
      ...inputValues,
      categoryIds: [...selectedtCategory],
      images: uploadImages,
    });
  }, [selectedtCategory, uploadImages]);
  //console.log('checkobx', selectedtCategory);
  //console.log('value', inputValues);
  //console.log('images', uploadImages);
  // console.log('errors', !!errors);
  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <UploadImage setUploadImages={setUploadImages} />
      <WritePriceWrapper>
        <PriceInput errorMessage={!!errors}>
          최소 대여시간
          <Input
            type="text"
            {...register('minRentalPeriod', {
              required: true,
            })}
            onChange={handleInputChange}
            className={
              inputValues.minRentalPeriod
                ? 'success'
                : errors.minRentalPeriod
                ? 'error'
                : ''
            }
          />
          {inputValues.minRentalPeriod && <BsCheckLg className="check-icon" />}
          {!inputValues.minRentalPeriod &&
            inputValues.minRentalPeriod === '' && (
              <BiErrorCircle className="error-icon" />
            )}
          {errors.minRentalPeriod && (
            <small
              className={`error-message ${
                errors.minRentalPeriod ? 'show' : ''
              }`}
            >
              필수 입력사항입니다.
            </small>
          )}
        </PriceInput>
        <PriceInput errorMessage={!!errors}>
          고정금액
          <Input
            type="text"
            {...register('baseFee', { required: true })}
            value={inputValues.baseFee}
            onChange={handleInputChange}
            className={
              inputValues.baseFee ? 'success' : errors.baseFee ? 'error' : ''
            }
          />
          {inputValues.baseFee && <BsCheckLg className="check-icon" />}
          {!inputValues.baseFee && inputValues.baseFee === '' && (
            <BiErrorCircle className="error-icon" />
          )}
          {errors.baseFee && (
            <small className={`error-message ${errors.baseFee ? 'show' : ''}`}>
              필수 입력사항입니다.
            </small>
          )}
        </PriceInput>
        <PriceInput errorMessage={!!errors}>
          1일 당 추가금액
          <Input
            type="text"
            {...register('feePerDay', { required: true })}
            value={inputValues.feePerDay}
            onChange={handleInputChange}
            className={
              inputValues.feePerDay
                ? 'success'
                : errors.feePerDay
                ? 'error'
                : ''
            }
          />
          {inputValues.feePerDay && <BsCheckLg className="check-icon" />}
          {!inputValues.feePerDay && inputValues.feePerDay === '' && (
            <BiErrorCircle className="error-icon" />
          )}
          {errors.feePerDay && (
            <small
              className={`error-message ${errors.feePerDay ? 'show' : ''}`}
            >
              필수 입력사항입니다.
            </small>
          )}
        </PriceInput>
      </WritePriceWrapper>

      <PriceInput errorMessage={!!errors}>
        제목
        <Input
          {...register('title', { required: true })}
          value={inputValues.title}
          onChange={handleInputChange}
          className={
            inputValues.title ? 'success' : errors.title ? 'error' : ''
          }
        />
        {inputValues.title && <BsCheckLg className="check-icon" />}
        {!inputValues.title && inputValues.title === '' && (
          <BiErrorCircle className="error-icon" />
        )}
        {errors.title && (
          <small className={`error-message ${errors.title ? 'show' : ''}`}>
            필수 입력사항입니다.
          </small>
        )}
      </PriceInput>
      <ReactQuill
        theme="snow"
        onChange={handleQuillChange}
        placeholder={CONTENT_DESCRIPTION}
      />
      <CheckBoxTitle>카테고리</CheckBoxTitle>
      <CheckBoxList
        selectedtCategory={selectedtCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ButtonWrapper>
        <button onClick={handleCancel}>취소</button>
        <button type="submit" disabled={isSubmitting}>
          등록
        </button>
      </ButtonWrapper>
      {showModal && (
        <ModalMain isOpen={showModal}>
          <ModalMain.Additional>
            <MdError />
          </ModalMain.Additional>
          <ModalMain.Title>작성 중인 내용이 있습니다.</ModalMain.Title>
          <ModalMain.Title>나가시겠습니까?</ModalMain.Title>
          <div>
            <ModalMain.Button
              color="inherit"
              backgroundColor={colorPalette.modalCancelButtonColor}
              hoverBackgroundColor={colorPalette.modalCancelHoverColor}
              onClick={() => setShowModal(false)}
            >
              머무르기
            </ModalMain.Button>
            <ModalMain.Button
              color={colorPalette.whiteColor}
              backgroundColor={colorPalette.heavyColor}
              hoverBackgroundColor={colorPalette.rightButtonHoverColor}
              onClick={handelExit}
            >
              이동하기
            </ModalMain.Button>
          </div>
        </ModalMain>
      )}
    </WritePostContainer>
  );
};

export default WritePost;
