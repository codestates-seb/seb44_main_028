import { NoDataWrapper } from '../style/style';
import NoDataImage from '../../assets/no_data/NoDataImage.svg';
import { NODATA_TEXT } from '../constants';

const NoData = () => {
  return (
    <NoDataWrapper>
      <img src={NoDataImage} alt="NoDataImg" />
      <p>{NODATA_TEXT}</p>
    </NoDataWrapper>
  );
};

export default NoData;
