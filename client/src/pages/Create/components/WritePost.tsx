import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { BsCheckLg } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import UploadImage from '../components/UploadImage';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import {
  WritePostContainer,
  PriceInput,
  WritePriceWrapper,
  ButtonWrapper,
  CheckBoxTitle,
  Input,
} from '../style';
import { CONTENT_DESCRIPTION } from '../constants';

const WritePost = () => {
  const [selectedtCategory, setSelectedCategory] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [inputValues, setInputValues] = useState({
    images: [] as string[],
    minRentalPeriod: '',
    baseFee: '',
    feePerDay: '',
    title: '',
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
  const handleInputChange = (e: any) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (data: any) => {
    const submitData = {
      ...data,
      content: inputValues.content,
    };
    alert(JSON.stringify(submitData));
  };
  useEffect(() => {
    setInputValues({
      ...inputValues,
      categoryIds: [...selectedtCategory],
      images: [...uploadImages],
    });
  }, [selectedtCategory, uploadImages]);
  //console.log('checkobx', selectedtCategory);
  // console.log('value', inputValues);
  //console.log('images', uploadImages);
  console.log('errors', !!errors);
  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <UploadImage setUploadImages={setUploadImages} />
      <WritePriceWrapper>
        <PriceInput errorMessage={!!errors}>
          최소 대여시간
          <Input
            type="text"
            {...register('minRentalPeriod', { required: true })}
            value={inputValues.minRentalPeriod}
            onChange={handleInputChange}
            // className={errors.minRentalPeriod ? 'error' : ''}
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
        <button>취소</button>
        <button type="submit" disabled={isSubmitting}>
          등록
        </button>
      </ButtonWrapper>
    </WritePostContainer>
  );
};

export default WritePost;
