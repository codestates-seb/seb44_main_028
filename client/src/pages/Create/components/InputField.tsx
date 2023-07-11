import { useForm } from 'react-hook-form';
import { InputFieldWrapper } from '../style';
import { InputFieldProps } from '../type';

const InputField = ({ id, label }: InputFieldProps) => {
  const { register } = useForm();
  return (
    <InputFieldWrapper>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" {...register(id)} />
    </InputFieldWrapper>
  );
};

export default InputField;
