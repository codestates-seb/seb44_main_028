import { useForm } from 'react-hook-form';
import { InputFieldWrapper } from '../style';
import { InputFieldProps } from '../type';

const InputField = ({ id, label, formErrors }: InputFieldProps) => {
  const {
    register,
    formState: { isDirty },
  } = useForm();
  const error = formErrors[id];
  return (
    <InputFieldWrapper>
      {error && <small role="alert">{error.message}</small>}
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        aria-invalid={!isDirty ? undefined : error ? 'true' : 'false'}
        {...register(id, { required: '필수 입력사항 입니다.' })}
      />
    </InputFieldWrapper>
  );
};

export default InputField;
