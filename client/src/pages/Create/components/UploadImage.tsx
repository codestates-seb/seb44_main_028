import { useState } from 'react';
import { BiSolidCameraPlus } from 'react-icons/bi';
import {
  UploadContainer,
  UploadImageLabel,
  UploadImageWrapper,
  UploadImageCountWrapper,
} from '../style';
import { MAX_IMAGE_COUNT } from '../constants';
const UploadImage = () => {
  const [showImages, setShowImages] = useState([]);
  return (
    <UploadContainer>
      <UploadImageLabel htmlFor="input-file">
        <UploadImageWrapper type="file" id="input-file" multiple />
        <BiSolidCameraPlus />
        <UploadImageCountWrapper>
          <p>{`0/${MAX_IMAGE_COUNT}`}</p>
        </UploadImageCountWrapper>
      </UploadImageLabel>
    </UploadContainer>
  );
};

export default UploadImage;
