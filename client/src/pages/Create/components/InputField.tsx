import { InputFieldWrapper } from '../style';
import { InputFieldProps } from '../type';

const InputField = ({ label, ...inputProps }: InputFieldProps) => {
  return (
    <InputFieldWrapper>
      <label>{label}</label>
      <input type="text" {...inputProps} />
    </InputFieldWrapper>
  );
};

export default InputField;
