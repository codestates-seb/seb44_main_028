import { ChangeEvent, useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';
import { BiSolidCameraPlus } from 'react-icons/bi';
import PreImage from './PreImage';
import ModalMain from '../../../common/components/Modal/ModalMain';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { MAX_IMAGE_COUNT } from '../constants';
import {
  UploadContainer,
  UploadImageLabel,
  UploadImageWrapper,
  UploadImageCountWrapper,
  PreViewImageWrapper,
} from '../style';
import { UploadImagesProps } from '../type';
const UploadImages = ({ setUploadImages }: UploadImagesProps) => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [imageOverflow, setImageOverflow] = useState<boolean>(false);
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    if (imageLists) {
      let newImages: File[] = [];
      for (let i = 0; i < imageLists.length; i++) {
        newImages.push(imageLists[i]);

        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        setShowImages((prev) => [...prev, currentImageUrl]);
      }

      if (newImages.length + showImages.length > MAX_IMAGE_COUNT) {
        setImageOverflow(true);
        setIsClick(true);
        newImages = newImages.slice(0, MAX_IMAGE_COUNT - showImages.length);
      }

      setUploadImages((prev) => ({ images: [...prev.images, ...newImages] }));
      console.log(newImages);
    }
  };

  const handleDeleteImage = (index: number) => {
    setShowImages((prev) => prev.filter((_, i) => i !== index));
    setUploadImages((prev) => {
      const updatedImages = [...prev.images];
      updatedImages.splice(index, 1);
      return { images: updatedImages };
    });
  };
  useEffect(() => {
    if (showImages.length > MAX_IMAGE_COUNT) {
      setImageOverflow(true);
    } else {
      setImageOverflow(false);
    }
  }, [imageOverflow, showImages]);

  return (
    <UploadContainer>
      <UploadImageLabel htmlFor="input-file">
        <UploadImageWrapper
          type="file"
          id="input-file"
          multiple
          onChange={handleAddImages}
        />
        <BiSolidCameraPlus />
        <UploadImageCountWrapper>
          <span>{`${showImages.length}`}</span>
          <span>{`/${MAX_IMAGE_COUNT}`}</span>
        </UploadImageCountWrapper>
      </UploadImageLabel>
      {showImages.map((image, index) => (
        <PreViewImageWrapper key={index}>
          <PreImage
            imageSrc={image}
            ImageId={index}
            handleDeleteImage={handleDeleteImage}
          />
        </PreViewImageWrapper>
      ))}
      {isClick && (
        <ModalMain isOpen={isClick}>
          <ModalMain.Additional>
            <MdError />
          </ModalMain.Additional>
          <ModalMain.Title>
            이미지는 최대 5까지 첨부할 수 있어요.
          </ModalMain.Title>
          <ModalMain.Button
            color={colorPalette.whiteColor}
            backgroundColor={colorPalette.heavyColor}
            hoverBackgroundColor={colorPalette.rightButtonHoverColor}
            onClick={() => setIsClick(false)}
          >
            닫기
          </ModalMain.Button>
        </ModalMain>
      )}
    </UploadContainer>
  );
};

export default UploadImages;
