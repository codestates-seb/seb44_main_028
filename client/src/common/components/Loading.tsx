import { BeatLoader } from 'react-spinners';
import { LoadingWrapper } from '../style/style';
import { colorPalette } from '../utils/enum/colorPalette';

const Loading = () => {
  return (
    <LoadingWrapper>
      <BeatLoader color={`${colorPalette.loadingColor}`} size={25} />
    </LoadingWrapper>
  );
};

export default Loading;
