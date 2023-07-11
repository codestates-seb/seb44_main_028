import { INPUT_FIELD, INPUT_FIELD_TITLE } from '../constants';
import InputField from './InputField';
import { WritePostContainer, WritePriceWrapper } from '../style';

const WritePost = () => {
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
    </WritePostContainer>
  );
};

export default WritePost;
