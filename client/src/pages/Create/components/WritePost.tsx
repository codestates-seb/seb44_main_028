import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import CheckBoxList from '../../../common/components/Checkbox/CheckBoxList';
import { CONTENT_DESCRIPTION } from '../constants';
import { WritePostContainer, WritePriceWrapper, ButtonWrapper } from '../style';

const WritePost = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm();
  const handleQuillChange = (value: string) => {
    console.log(value);
  };
  const onSubmit = async (data: any) => {
    alert(JSON.stringify(data));
  };
  console.log('error', errors);
  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <WritePriceWrapper>
        <div>
          <label htmlFor="minRentalPeriod">최소 대여시간</label>
          <input
            id="minRentalPeriod"
            type="text"
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            {...register('minRentalPeriod', { required: true })}
          />
          {errors.minRentalPeriod && (
            <small role="alert">필수 입력사항입니다.</small>
          )}
        </div>
        <div>
          <label>고정금액</label>
          <input
            id="baseFee"
            type="text"
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            {...register('baseFee', { required: true })}
          />
          {errors.baseFee && <small role="alert">필수 입력사항입니다.</small>}
        </div>
        <div>
          <label>1일 당 추가금액</label>
          <input
            id="feePerDay"
            type="text"
            aria-invalid={
              !isDirty ? undefined : errors.password ? 'true' : 'false'
            }
            {...register('feePerDay', { required: true })}
          />
          {errors.feePerDay && <small role="alert">필수 입력사항입니다.</small>}
        </div>
      </WritePriceWrapper>

      <label>제목</label>
      <input
        id="title"
        type="text"
        aria-invalid={!isDirty ? undefined : errors.password ? 'true' : 'false'}
        {...register('title', { required: true })}
      />
      {errors.title && <small role="alert">필수 입력사항입니다.</small>}
      <ReactQuill
        theme="snow"
        onChange={handleQuillChange}
        placeholder={CONTENT_DESCRIPTION}
      />
      <CheckBoxList />
      <ButtonWrapper>
        <button>취소</button>
        <button type="submit" disabled={isSubmitting}>
          등록
        </button>
      </ButtonWrapper>
    </WritePostContainer>
  );
};

export default WritePost;
