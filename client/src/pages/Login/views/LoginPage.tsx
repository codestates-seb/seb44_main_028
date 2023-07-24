import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import KakaoLogin from '../components/KakaoLogin';
import { LoginPageContainer } from '../style';
import styled from 'styled-components';

const Logo = styled.div`
  width: 500px;
  margin-right: 170px;
  clip-path: inset(0 0 0 35%);
  background-image: url('/public/logo.png');
`;

function LoginPage() {
  return (
    <LoginPageContainer>
      <Logo />
      <KakaoLogin />
    </LoginPageContainer>
  );
}
export default LoginPage;
