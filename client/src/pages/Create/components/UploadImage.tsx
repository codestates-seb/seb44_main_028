import { BiSolidCameraPlus } from 'react-icons/bi';
import {
  UploadImageContainer,
  UploadImageWrapper,
  UploadImageCountWrapper,
} from '../style';
import { MAX_IMAGE_COUNT } from '../constants';
const UploadImage = () => {
  return (
    <UploadImageContainer htmlFor="input-file">
      <UploadImageWrapper type="file" id="input-file" />
      <BiSolidCameraPlus />
      <UploadImageCountWrapper>
        <p>{`0/${MAX_IMAGE_COUNT}`}</p>
      </UploadImageCountWrapper>
    </UploadImageContainer>
  );
};

export default UploadImage;
