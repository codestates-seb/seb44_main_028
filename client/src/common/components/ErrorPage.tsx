import { ErrorWrapper } from '../style/style';
import ErrorImage from '../../assets/404_error/404_error.svg';
import { ERROR_MESSAGE } from '../../pages/MyPage/constants';

const ErrorPage = () => {
  return (
    <ErrorWrapper>
      <img src={ErrorImage} />
      {ERROR_MESSAGE.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </ErrorWrapper>
  );
};

export default ErrorPage;
