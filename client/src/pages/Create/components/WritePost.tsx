import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BsCheckLg } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import {
  CONTENT_DESCRIPTION,
  INPIT_VALIDATION,
  INPUT_FIELD,
} from '../constants';
import {
  WritePostContainer,
  WritePriceWrapper,
  ButtonWrapper,
  CheckBoxTitle,
  PriceInput,
  TitleInput,
} from '../style';
import { ChangeEvent, useEffect, useState } from 'react';

const WritePost = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();
  const [isInputChange, setIsInputChange] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [isInputValid, setIsInputValid] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);
  const handleQuillChange = (value: string) => {
    console.log(value);
  };
  const onSubmit = async (data: any) => {
    alert(JSON.stringify(data));
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newValue = e.target.value.length > 0;
    setIsInputChange((prevState) => {
      const newState = [...prevState];
      newState[index] = newValue;
      return newState;
    });
    setIsInputValid((prevState) => {
      const newState = [...prevState];
      newState[index] = newValue && !errors[INPUT_FIELD[index].id];
      return newState;
    });
  };
  const handleInputBlur = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setIsInputValid((prevState) => {
      const newState = [...prevState];
      newState[index] = !!e.target.value && !errors[INPUT_FIELD[index].id];
      return newState;
    });
  };
  useEffect(() => {
    setIsInputValid((prevState) => {
      const newState = [...prevState];
      for (let i = 0; i < INPUT_FIELD.length; i++) {
        newState[i] = !errors[INPUT_FIELD[i].id];
      }
      return newState;
    });
  }, [errors]);
  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <WritePriceWrapper>
        <PriceInput className="priceInput" isInputChange={isInputChange[0]}>
          <label htmlFor={`${INPUT_FIELD[0].id}}`}>
            {INPUT_FIELD[0].title}
          </label>
          <input
            id={INPUT_FIELD[0].id}
            type="text"
            aria-invalid={
              !isDirty
                ? undefined
                : errors[INPUT_FIELD[0].id]
                ? 'true'
                : 'false'
            }
            {...register(`${INPUT_FIELD[0].id}`, { required: true })}
            onChange={(e) => handleInputChange(e, 0)}
            onBlur={(e) => handleInputBlur(e, 0)}
          />
          {isInputChange[0] && <BsCheckLg />}
          {!isInputValid[0] && <BiErrorCircle />}
          {errors[INPUT_FIELD[0].id] && (
            <small role="alert">{INPIT_VALIDATION}</small>
          )}
        </PriceInput>
        <PriceInput className="priceInput" isInputChange={isInputChange[1]}>
          <label>{INPUT_FIELD[1].title}</label>
          <input
            id={`${INPUT_FIELD[1].id}}`}
            type="text"
            aria-invalid={
              !isDirty
                ? undefined
                : errors[INPUT_FIELD[1].id]
                ? 'true'
                : 'false'
            }
            {...register(`${INPUT_FIELD[1].id}`, { required: true })}
            onChange={(e) => handleInputChange(e, 1)}
            onBlur={(e) => handleInputBlur(e, 1)}
          />
          {isInputChange[1] && <BsCheckLg />}
          {!isInputValid[1] && <BiErrorCircle />}
          {errors[INPUT_FIELD[1].id] && (
            <small role="alert">{INPIT_VALIDATION}</small>
          )}
        </PriceInput>
        <PriceInput className="titleInput" isInputChange={isInputChange[2]}>
          <label>{INPUT_FIELD[2].title}</label>
          <input
            id={`${INPUT_FIELD[2].id}}`}
            type="text"
            aria-invalid={
              !isDirty
                ? undefined
                : errors[INPUT_FIELD[2].id]
                ? 'true'
                : 'false'
            }
            {...register(`${INPUT_FIELD[2].id}`, { required: true })}
            onChange={(e) => handleInputChange(e, 2)}
            onBlur={(e) => handleInputBlur(e, 2)}
          />
          {isInputChange[2] && <BsCheckLg />}
          {!isInputValid[2] && <BiErrorCircle />}
          {errors[INPUT_FIELD[2].id] && (
            <small role="alert">{INPIT_VALIDATION}</small>
          )}
        </PriceInput>
      </WritePriceWrapper>
      <TitleInput isInputChange={isInputChange[3]}>
        <label>{INPUT_FIELD[3].title}</label>
        <input
          id={`${INPUT_FIELD[3].id}`}
          type="text"
          aria-invalid={
            !isDirty ? undefined : errors[INPUT_FIELD[3].id] ? 'true' : 'false'
          }
          {...register(`${INPUT_FIELD[3].id}`, { required: true })}
          onChange={(e) => handleInputChange(e, 3)}
          onBlur={(e) => handleInputBlur(e, 3)}
        />
        {isInputChange[3] && <BsCheckLg />}
        {!isInputValid[3] && <BiErrorCircle />}
        {errors[INPUT_FIELD[3].id] && (
          <small role="alert">{INPIT_VALIDATION}</small>
        )}
      </TitleInput>
      <ReactQuill
        theme="snow"
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
