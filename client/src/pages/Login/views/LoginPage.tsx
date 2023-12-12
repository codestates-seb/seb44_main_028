import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import KakaoLogin from '../components/KakaoLogin';
import { LoginPageContainer } from '../style';
import styled from 'styled-components';

export const Logo = styled.div`
  width: 260px;
  height: 100px;
  margin-right: 30px;
  background: url('/logo.png') no-repeat center/cover;
`;

export const WelcomeNoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70px;
`;

export const WelcomeNotice = styled.p`
  font-size: 18px;
  font-weight: 100;
  color: #656565;
  margin: 5px 0 5px 0;
`;

function LoginPage() {
  return (
    <LoginPageContainer>
      <Logo />
      <WelcomeNoticeWrapper>
        <WelcomeNotice>환영합니다.</WelcomeNotice>
        <WelcomeNotice>간편한 소셜 로그인으로 시작해보세요.</WelcomeNotice>
      </WelcomeNoticeWrapper>
      <KakaoLogin />
    </LoginPageContainer>
  );
}
export default LoginPage;
