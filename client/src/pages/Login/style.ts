import styled from 'styled-components';

export const LoginPageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  margin-bottom: -200px;
  margin-top: 120px;
`;

export const KakaoLoginBtn = styled.div`
  background-image: url('/kakao_login_medium_wide.png');
  background-repeat: no-repeat;
  width: 400px;
  height: 60px;
  margin-top: 30px;
  margin-left: 80px;
  cursor: pointer;
`;
