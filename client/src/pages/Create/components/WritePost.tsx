import { INPUT_FIELD } from '../constants';
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
    </WritePostContainer>
  );
};

export default WritePost;
