import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { INPUT_FIELD, INPUT_FIELD_TITLE } from '../constants';
import InputField from './InputField';
import { WritePostContainer, WritePriceWrapper } from '../style';

const WritePost = () => {
  const handleQuillChange = (value: string) => {
    console.log(value);
  };
  return (
    <WritePostContainer>
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
      <ReactQuill theme="snow" onChange={handleQuillChange} />
    </WritePostContainer>
  );
};

export default WritePost;
