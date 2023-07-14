import React, { ChangeEvent, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { BsCheckLg } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import {
  WritePostContainer,
  PriceInput,
  WritePriceWrapper,
  ButtonWrapper,
  CheckBoxTitle,
} from '../style';
import { CONTENT_DESCRIPTION } from '../constants';

const WritePost = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const [inputValues, setInputValues] = useState({
    minRentalPeriod: '',
    baseFee: '',
    feePerDay: '',
    title: '',
    content: '',
  });
  const handleQuillChange = (value: string) => {
    console.log(value);
    setInputValues((prev) => ({
      ...prev,
      content: value,
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

  console.log(inputValues);
  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <WritePriceWrapper>
        <PriceInput>
          최소 대여시간
          <input
            type="text"
            {...register('minRentalPeriod', { required: true })}
            value={inputValues.minRentalPeriod}
            onChange={handleInputChange}
            className={errors.minRentalPeriod ? 'error' : ''}
          />
          {inputValues.minRentalPeriod && <BsCheckLg className="check-icon" />}
          {!inputValues.minRentalPeriod &&
            inputValues.minRentalPeriod === '' && (
              <BiErrorCircle className="error-icon" />
            )}
          {errors.minRentalPeriod && (
            <span className="error-message">필수 입력사항입니다.</span>
          )}
        </PriceInput>
        <PriceInput>
          고정금액
          <input
            type="text"
            {...register('baseFee', { required: true })}
            value={inputValues.baseFee}
            onChange={handleInputChange}
            className={errors.baseFee ? 'error' : ''}
          />
          {inputValues.baseFee && <BsCheckLg className="check-icon" />}
          {!inputValues.baseFee && inputValues.baseFee === '' && (
            <BiErrorCircle className="error-icon" />
          )}
          {errors.baseFee && (
            <span className="error-message">필수 입력사항입니다.</span>
          )}
        </PriceInput>
        <PriceInput>
          1일 당 추가금액
          <input
            type="text"
            {...register('feePerDay', { required: true })}
            value={inputValues.feePerDay}
            onChange={handleInputChange}
            className={errors.feePerDay ? 'error' : ''}
          />
          {inputValues.feePerDay && <BsCheckLg className="check-icon" />}
          {!inputValues.feePerDay && inputValues.feePerDay === '' && (
            <BiErrorCircle className="error-icon" />
          )}
          {errors.feePerDay && (
            <span className="error-message">필수 입력사항입니다.</span>
          )}
        </PriceInput>
      </WritePriceWrapper>

      <PriceInput>
        제목
        <input
          {...register('title', { required: true })}
          value={inputValues.title}
          onChange={handleInputChange}
          className={errors.title ? 'error' : ''}
        />
        {inputValues.title && <BsCheckLg className="check-icon" />}
        {!inputValues.title && inputValues.title === '' && (
          <BiErrorCircle className="error-icon" />
        )}
        {errors.title && (
          <span className="error-message">필수 입력사항입니다.</span>
        )}
      </PriceInput>
      <ReactQuill
        theme="snow"
        value={inputValues.content}
        onChange={handleQuillChange}
        placeholder={CONTENT_DESCRIPTION}
      />
      <CheckBoxTitle>카테고리</CheckBoxTitle>
      <CheckBoxList />

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
