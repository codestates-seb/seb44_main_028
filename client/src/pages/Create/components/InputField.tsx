import { InputFieldWrapper } from '../style';
import { InputFieldProps } from '../type';

const InputField = ({ id, label, ...inputProps }: InputFieldProps) => {
  return (
    <InputFieldWrapper>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...inputProps} />
    </InputFieldWrapper>
  );
};

export default InputField;
