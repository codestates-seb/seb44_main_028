import { InputFieldWrapper } from '../style';

const InputField = ({ label, ...inputProps }) => {
  return (
    <InputFieldWrapper>
      <label>{label}</label>
      <input type="text" {...inputProps} />
    </InputFieldWrapper>
  );
};

export default InputField;
