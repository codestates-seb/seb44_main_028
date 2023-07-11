import { UseFormRegister, FieldValues } from 'react-hook-form';
export type PreImageProps = {
  imageSrc: string;
  ImageId: number;
  handleDeleteImage: (id: number) => void;
};
export type InputFieldData = {
  id: string;
  title: string;
};
export type InputFieldProps = {
  label: string;
  inputProps: UseFormRegister<FieldValues>;
};
