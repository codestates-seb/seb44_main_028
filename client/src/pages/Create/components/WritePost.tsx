import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import BigBtn from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import {
  CONTENT_DESCRIPTION,
  INPUT_FIELD,
  INPUT_FIELD_TITLE,
} from '../constants';
import InputField from './InputField';
import { WritePostContainer, WritePriceWrapper, ButtonWrapper } from '../style';

const WritePost = () => {
  const { register, handleSubmit } = useForm();
  const handleQuillChange = (value: string) => {
    console.log(value);
  };
  return (
    <WritePostContainer
      onSubmit={handleSubmit(async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        alert(JSON.stringify(data));
      })}
    >
      <WritePriceWrapper>
        {INPUT_FIELD.map((input) => (
          <InputField id={input.id} label={input.title} />
        ))}
      </WritePriceWrapper>
      <InputField
        id={INPUT_FIELD_TITLE[0].id}
        label={INPUT_FIELD_TITLE[0].title}
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
        <button type="submit">등록</button>
      </ButtonWrapper>
    </WritePostContainer>
  );
};

export default WritePost;
