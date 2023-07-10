import { ErrorWrapper } from '../style/style';
import ErrorImage from '../../assets/404_error/404_error.svg';

const Error = () => {
  return (
    <ErrorWrapper>
      <img src={ErrorImage} />
      <p></p>
      <p></p>
    </ErrorWrapper>
  );
};

export default Error;
