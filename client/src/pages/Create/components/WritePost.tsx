import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
      <ReactQuill
        theme="snow"
        onChange={handleQuillChange}
        placeholder={CONTENT_DESCRIPTION}
      />
      <CheckBoxList />
      <ButtonWrapper>
        <BigBtn
          color="inherit"
          backgroundColor={colorPalette.modalCancelButtonColor}
          hoverBackgroundColor={colorPalette.modalCancelHoverColor}
          height={57}
          width={175}
          children={'취소'}
        />
        <BigBtn
          color={colorPalette.whiteColor}
          backgroundColor={colorPalette.heavyColor}
          hoverBackgroundColor={colorPalette.rightButtonHoverColor}
          height={57}
          width={175}
          children={'등록'}
        />
      </ButtonWrapper>
    </WritePostContainer>
  );
};

export default WritePost;
