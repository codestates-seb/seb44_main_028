import { INPUT_FIELD } from '../constants';
import { WritePostContainer } from '../style';
import InputField from './InputField';
const WritePost = () => {
  return (
    <WritePostContainer>
      {INPUT_FIELD.map((input) => (
        <InputField id={input.id} label={input.title} />
      ))}
    </WritePostContainer>
  );
};

export default WritePost;
