import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { MdError } from 'react-icons/md';
import { BsCheckLg } from 'react-icons/bs';
import { BiErrorCircle } from 'react-icons/bi';
import UploadImage from '../components/UploadImage';
import ModalMain from '../../../common/components/Modal/ModalMain';
import CheckBoxList from '../../../common/components/CheckBox/CheckBoxList';
import {
  CONTENT_DESCRIPTION,
  MAX_IMAGE_COUNT,
  INPIT_VALIDATION,
  INPUT_FIELD,
} from '../constants';
import { categories } from '../type';
import { IProductDetail } from '../../Update/model/IProductDetail';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import {
  WritePostContainer,
  PriceInput,
  WritePriceWrapper,
  ButtonWrapper,
  CheckBoxTitle,
  Input,
} from '../style';
import { ACCESS_TOKEN } from '../../Login/constants';

const WritePost = ({
  productData,
}: {
  productData: IProductDetail | string;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const decrypt = useDecryptToken();
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);
    if (encryptedAccessToken) {
      const decryptedToken = decrypt(encryptedAccessToken);
      setAccessToken(decryptedToken);
    }
  }, []);
  const defaultInputValues = {
    title: '',
    baseFee: '',
    feePerDay: '',
    overdueFee: '',
    minimumRentalPeriod: '',
    content: '',
    categoryIds: [] as string[],
  };
  const initialInputValue =
    typeof productData === 'string' ? defaultInputValues : productData;
  const [inputValues, setInputValues] = useState(initialInputValue);

  const navigate = useNavigate();
  const params = useParams();
  const categoryIds =
    typeof productData === 'object'
      ? (productData.categories as unknown as categories[]).map(
          (cat) => cat.categoryId,
        )
      : [];

  const [selectedCategory, setSelectedCategory] = useState<string[]>([
    ...categoryIds,
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  // string[] -> File[]
  const createFilesFromUrls = (urls: string[]): File[] => {
    const files: File[] = [];

    for (const url of urls) {
      const file = new File([url], 'image.jpg', { type: 'image/jpeg' });
      files.push(file);
    }
    return files;
  };

  const productDataImages =
    typeof productData === 'object'
      ? createFilesFromUrls(productData?.productImages as unknown as string[])
      : [];
  const productShowImages =
    typeof productData === 'object' ? productData?.productImages : [];
  const [showImages, setShowImages] = useState<string[]>(
    [...productShowImages].slice(0, MAX_IMAGE_COUNT),
  );
  const [uploadImages, setUploadImages] = useState<{
    images: File[];
  }>({
    images: [...productDataImages].slice(0, MAX_IMAGE_COUNT),
  });
  //
  const handleQuillChange = (value: string) => {
    const strippedValue = value.replace(/<\/?[^>]+(>|$)/g, '');
    setInputValues((prev) => ({
      ...prev,
      content: strippedValue,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    let newValue: string | number | undefined;

    if (e.target.name === 'minimumRentalPeriod') {
      newValue = /^\d+$/.test(inputValue) ? Number(inputValue) : '';
    } else {
      newValue = inputValue;
    }
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: newValue,
    }));
  };
  const handleCancel = () => {
    setShowModal(!showModal);
  };
  const handelExit = () => {
    navigate('/');
  };
  const newPost = useMutation((post: object) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/products`, post, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        const { data } = res;
        navigate(`/detail/${data.productId}`);
        console.log('data', data);
      })
      .catch((err) => {
        console.log(err);
      }),
  );
  const updatePost = useMutation((update: object) =>
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/api/products/${params.itemId}`,
        update,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then((res) => {
        const { data } = res;
        console.log('data', data);
        navigate(`/detail/${params.itemId}`);
      })
      .catch((err) => {
        console.log(err);
      }),
  );

  const onSubmit = () => {
    if (inputValues.content === '' || selectedCategory.length === 0) {
      return null;
    } else {
      const parsedInputValues = {
        ...inputValues,
        baseFee: inputValues.baseFee ? Number(inputValues.baseFee) : undefined,
        feePerDay: inputValues.feePerDay
          ? Number(inputValues.feePerDay)
          : undefined,
        overdueFee: inputValues.overdueFee
          ? Number(inputValues.overdueFee)
          : undefined,
        minimumRentalPeriod: inputValues.minimumRentalPeriod
          ? Number(inputValues.minimumRentalPeriod)
          : undefined,
        categoryIds: [...selectedCategory],
      };

      const formData = new FormData();
      const blobJson = new Blob([JSON.stringify(parsedInputValues)], {
        type: 'application/json',
      });
      formData.append('request', blobJson);
      for (const image of uploadImages.images) {
        formData.append('images', image);
      }
      if (typeof productData === 'object') {
        updatePost.mutate(formData);
      } else if (typeof productData === 'string') {
        newPost.mutate(formData);
      }
    }
    reset();
  };
  useEffect(() => {
    const categoryIds =
      typeof productData === 'object'
        ? (productData.categories as unknown as categories[]).map(
            (cat) => cat.categoryId,
          )
        : [];
    setSelectedCategory(categoryIds);
    setInputValues({
      ...inputValues,
      categoryIds: [...selectedCategory],
    });
  }, [productData]);

  useEffect(() => {
    setShowImages([...productShowImages].slice(0, MAX_IMAGE_COUNT));
  }, []);
  return (
    <WritePostContainer onSubmit={handleSubmit(onSubmit)}>
      <UploadImage
        setUploadImages={setUploadImages}
        showImages={showImages}
        setShowImages={setShowImages}
      />
      <WritePriceWrapper>
        <PriceInput errorMessage={!!errors}>
          최소 대여시간
          <Input
            type="text"
            {...register('minimumRentalPeriod', {
              required: true,
            })}
            value={inputValues?.minimumRentalPeriod}
            onChange={handleInputChange}
            className={
              inputValues?.minimumRentalPeriod
                ? 'success'
                : errors?.minimumRentalPeriod
                ? 'error'
                : ''
            }
          />
          {inputValues?.minimumRentalPeriod && (
            <BsCheckLg className="check-icon" />
          )}
          {!inputValues?.minimumRentalPeriod &&
            inputValues?.minimumRentalPeriod === '' && (
              <BiErrorCircle className="error-icon" />
            )}
          {errors?.minimumRentalPeriod && (
            <small
              className={`error-message ${
                errors?.minimumRentalPeriod ? 'show' : ''
              }`}
            >
              필수 입력사항입니다.
            </small>
          )}
        </PriceInput>
        <PriceInput errorMessage={!!errors}>
          고정금액
          <Input
            type="text"
            {...register('baseFee', { required: true })}
            value={inputValues?.baseFee}
            onChange={handleInputChange}
            className={
              inputValues?.baseFee ? 'success' : errors?.baseFee ? 'error' : ''
            }
          />
          {inputValues?.baseFee && <BsCheckLg className="check-icon" />}
          {!inputValues?.baseFee && inputValues?.baseFee === '' && (
            <BiErrorCircle className="error-icon" />
          )}
          {errors?.baseFee && (
            <small className={`error-message ${errors?.baseFee ? 'show' : ''}`}>
              필수 입력사항입니다.
            </small>
          )}
        </PriceInput>
        <PriceInput errorMessage={!!errors}>
          1일 당 추가금액
          <Input
            type="text"
            {...register('feePerDay', { required: true })}
            value={inputValues?.feePerDay}
            onChange={handleInputChange}
            className={
              inputValues?.feePerDay
                ? 'success'
                : errors?.feePerDay
                ? 'error'
                : ''
            }
          />
          {inputValues?.feePerDay && <BsCheckLg className="check-icon" />}
          {!inputValues?.feePerDay && inputValues?.feePerDay === '' && (
            <BiErrorCircle className="error-icon" />
          )}
          {errors.feePerDay && (
            <small
              className={`error-message ${errors?.feePerDay ? 'show' : ''}`}
            >
              필수 입력사항입니다.
            </small>
          )}
        </PriceInput>
        <PriceInput errorMessage={!!errors}>
          연체료
          <Input
            type="text"
            {...register('overdueFee', { required: true })}
            value={inputValues?.overdueFee}
            onChange={handleInputChange}
            className={
              inputValues?.overdueFee
                ? 'success'
                : errors?.overdueFee
                ? 'error'
                : ''
            }
          />
          {inputValues?.overdueFee && <BsCheckLg className="check-icon" />}
          {!inputValues?.overdueFee && inputValues?.overdueFee === '' && (
            <BiErrorCircle className="error-icon" />
          )}
          {errors?.overdueFee && (
            <small
              className={`error-message ${errors?.overdueFee ? 'show' : ''}`}
            >
              필수 입력사항입니다.
            </small>
          )}
        </PriceInput>
      </WritePriceWrapper>

      <PriceInput errorMessage={!!errors}>
        제목
        <Input
          {...register('title', { required: true })}
          value={inputValues?.title}
          onChange={handleInputChange}
          className={
            inputValues?.title ? 'success' : errors?.title ? 'error' : ''
          }
        />
        {inputValues?.title && <BsCheckLg className="check-icon" />}
        {!inputValues?.title && inputValues?.title === '' && (
          <BiErrorCircle className="error-icon" />
        )}
        {errors?.title && (
          <small className={`error-message ${errors?.title ? 'show' : ''}`}>
            필수 입력사항입니다.
          </small>
        )}
      </PriceInput>
      <ReactQuill
        defaultValue={inputValues?.content}
        theme="snow"
        onChange={handleQuillChange}
        placeholder={CONTENT_DESCRIPTION}
      />
      <CheckBoxTitle>카테고리</CheckBoxTitle>
      <CheckBoxList
        selectedtCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ButtonWrapper>
        <button onClick={handleCancel}>취소</button>
        <button type="submit" disabled={isSubmitting}>
          등록
        </button>
      </ButtonWrapper>
      {showModal && (
        <ModalMain isOpen={showModal}>
          <ModalMain.Additional>
            <MdError />
          </ModalMain.Additional>
          <ModalMain.Title>작성 중인 내용이 있습니다.</ModalMain.Title>
          <ModalMain.Title>나가시겠습니까?</ModalMain.Title>
          <div>
            <ModalMain.Button
              color="inherit"
              backgroundColor={colorPalette.modalCancelButtonColor}
              hoverBackgroundColor={colorPalette.modalCancelHoverColor}
              onClick={() => setShowModal(false)}
            >
              머무르기
            </ModalMain.Button>
            <ModalMain.Button
              color={colorPalette.whiteColor}
              backgroundColor={colorPalette.heavyColor}
              hoverBackgroundColor={colorPalette.rightButtonHoverColor}
              onClick={handelExit}
            >
              이동하기
            </ModalMain.Button>
          </div>
        </ModalMain>
      )}
    </WritePostContainer>
  );
};

export default WritePost;
