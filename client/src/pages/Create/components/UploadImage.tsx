import { ChangeEvent, useEffect, useState } from 'react';
import { BiSolidCameraPlus } from 'react-icons/bi';
import {
  UploadContainer,
  UploadImageLabel,
  UploadImageWrapper,
  UploadImageCountWrapper,
} from '../style';
import { MAX_IMAGE_COUNT } from '../constants';
const UploadImages = () => {
  const [showImages, setShowImages] = useState<string[]>([]);
  const [imageOverflow, setImageOverflow] = useState<boolean>(false);

  const handleAddImages = (e: ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    let imageUrlLists: string[] = [...showImages];
    console.log(imageLists);
    if (imageLists) {
      for (let i = 0; i < imageLists.length; i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }
      console.log(e.target.files);
      if (imageUrlLists.length > MAX_IMAGE_COUNT) {
        setImageOverflow(true);
        imageUrlLists = imageUrlLists.slice(0, MAX_IMAGE_COUNT);
      }
      setShowImages([...imageUrlLists]);
    }
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
          <p>{`${showImages.length}/${MAX_IMAGE_COUNT}`}</p>
        </UploadImageCountWrapper>
      </UploadImageLabel>
      {imageOverflow && <p>이미지는 최대 5까지 첨부할 수 있어요.</p>}
    </UploadContainer>
  );
};

export default UploadImages;
