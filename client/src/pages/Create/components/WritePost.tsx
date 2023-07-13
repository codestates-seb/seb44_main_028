import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import {
  CONTENT_DESCRIPTION,
  INPUT_FIELD,
  INPUT_FIELD_TITLE,
} from '../constants';
import InputField from './InputField';
import { WritePostContainer, WritePriceWrapper, ButtonWrapper } from '../style';

const WritePost = () => {
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const handleQuillChange = (value: string) => {
    console.log(value);
  };
  const onSubmit = async (data: any) => {
    alert(JSON.stringify(data));
  };
  console.log(errors);
  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <WritePriceWrapper>
        {INPUT_FIELD.map((input) => (
          <InputField
            key={input.id}
            id={input.id}
            label={input.title}
            formErrors={errors}
          />
        ))}
      </WritePriceWrapper>
      <InputField
        id={INPUT_FIELD_TITLE[0].id}
        label={INPUT_FIELD_TITLE[0].title}
        formErrors={errors}
      />
      <label>내용</label>
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
