import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import {
  CONTENT_DESCRIPTION,
  INPIT_VALIDATION,
  INPUT_FIELD,
} from '../constants';
import { WritePostContainer, WritePriceWrapper, ButtonWrapper } from '../style';

const WritePost = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();
  const handleQuillChange = (value: string) => {
    console.log(value);
  };
  const onSubmit = async (data: any) => {
    alert(JSON.stringify(data));
  };

  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <WritePriceWrapper>
        <div>
          <label htmlFor={`${INPUT_FIELD[0].id}}`}>
            {INPUT_FIELD[0].title}
          </label>
          <input
            id={`${INPUT_FIELD[0].id}}`}
            type="text"
            aria-invalid={
              !isDirty
                ? undefined
                : errors[INPUT_FIELD[0].id]
                ? 'true'
                : 'false'
            }
            {...register(`${INPUT_FIELD[0].id}`, { required: true })}
          />
          {errors[INPUT_FIELD[0].id] && (
            <small role="alert">{INPIT_VALIDATION}</small>
          )}
        </div>
        <div>
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
          />
          {errors[INPUT_FIELD[1].id] && (
            <small role="alert">{INPIT_VALIDATION}</small>
          )}
        </div>
        <div>
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
          />
          {errors[INPUT_FIELD[2].id] && (
            <small role="alert">{INPIT_VALIDATION}</small>
          )}
        </div>
      </WritePriceWrapper>

      <label>{INPUT_FIELD[3].title}</label>
      <input
        id={`${INPUT_FIELD[3].id}}`}
        type="text"
        aria-invalid={
          !isDirty ? undefined : errors[INPUT_FIELD[3].id] ? 'true' : 'false'
        }
        {...register(`${INPUT_FIELD[3].id}`, { required: true })}
      />
      {errors[INPUT_FIELD[3].id] && (
        <small role="alert">{INPIT_VALIDATION}</small>
      )}
      <ReactQuill
        theme="snow"
        onChange={handleQuillChange}
        placeholder={CONTENT_DESCRIPTION}
      />
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
