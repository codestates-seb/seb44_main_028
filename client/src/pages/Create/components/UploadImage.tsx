import { BiSolidCameraPlus } from 'react-icons/bi';
import {
  UploadImageContainer,
  UploadImageWrapper,
  UploadImageCountWrapper,
} from '../style';
import { MAX_IMAGE_COUNT } from '../constants';
const UploadImage = () => {
  return (
    <UploadImageContainer>
      <UploadImageWrapper>
        <BiSolidCameraPlus />
      </UploadImageWrapper>
      <UploadImageCountWrapper>
        <p>{`0/${MAX_IMAGE_COUNT}`}</p>
      </UploadImageCountWrapper>
    </UploadImageContainer>
  );
};

export default UploadImage;
