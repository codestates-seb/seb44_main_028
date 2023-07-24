import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import KakaoLogin from '../components/KakaoLogin';
import { LoginPageContainer } from '../style';
import { ACCESS_TOKEN } from '../constants';
import styled from 'styled-components';

const Logo = styled.img`
  width: 500px;
  margin-right: 170px;
  clip-path: inset(0 0 0 35%);
`;

function LoginPage() {
  return (
    <LoginPageContainer>
      {/* <Logo src="/logo.png" /> */}
      <KakaoLogin />
    </LoginPageContainer>
  );
}
export default LoginPage;
