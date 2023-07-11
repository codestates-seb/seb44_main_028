import { IoIosClose } from 'react-icons/io';
import { PreImageWrapper } from '../style';
const PreImage = ({
  imageSrc,
  ImageId,
  handleDeleteImage,
}: {
  imageSrc: string;
  ImageId: number;
  handleDeleteImage: (id: number) => void;
}) => {
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
