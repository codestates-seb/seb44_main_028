import { IoIosClose } from 'react-icons/io';
import { PreImageWrapper } from '../style';
const PreImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <PreImageWrapper>
      <img src={imageSrc} />
      <IoIosClose className="closeIcon" />
    </PreImageWrapper>
  );
};

export default PreImage;
