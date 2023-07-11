import { ChangeEvent, useEffect, useState } from 'react';
import { BiSolidCameraPlus } from 'react-icons/bi';
import PreImage from './PreImage';
import { MAX_IMAGE_COUNT } from '../constants';
import {
  UploadContainer,
  UploadImageLabel,
  UploadImageWrapper,
  UploadImageCountWrapper,
  PreViewImageWrapper,
} from '../style';
const UploadImages = () => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [imageOverflow, setImageOverflow] = useState<boolean>(false);

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    let imageUrlLists: string[] = [...showImages];
    if (imageLists) {
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      if (imageUrlLists.length > MAX_IMAGE_COUNT) {
        setImageOverflow(true);
        imageUrlLists = imageUrlLists.slice(0, MAX_IMAGE_COUNT);
      }
      setShowImages([...imageUrlLists]);
    }
  };
  const handleDeleteImage = (index: number) => {
    setShowImages((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (showImages.length > MAX_IMAGE_COUNT) {
      setImageOverflow(true);
    } else {
      setImageOverflow(false);
    }
    console.log(showImages.length, imageOverflow);
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
        <PreViewImageWrapper>
          <PreImage
            imageSrc={image}
            key={index}
            ImageId={index}
            handleDeleteImage={handleDeleteImage}
          />
        </PreViewImageWrapper>
      ))}
      {imageOverflow && <p>이미지는 최대 5까지 첨부할 수 있어요.</p>}
    </UploadContainer>
  );
};

export default UploadImages;
