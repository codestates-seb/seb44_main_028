import { PreImageWrapper } from '../style';
const PreImage = ({ imageSrc }: { imageSrc: string }) => {
  return (
    <PreImageWrapper>
      <img src={imageSrc} />
    </PreImageWrapper>
  );
};

export default PreImage;
