import { IoIosClose } from 'react-icons/io';
import { PreImageProps } from '../type';
import { PreImageWrapper } from '../style';
const PreImage = ({ imageSrc, ImageId, handleDeleteImage }: PreImageProps) => {
  return (
    <PreImageWrapper>
      <img src={imageSrc} />
      <IoIosClose
        className="closeIcon"
        onClick={() => handleDeleteImage(ImageId)}
      />
    </PreImageWrapper>
  );
};

export default PreImage;
