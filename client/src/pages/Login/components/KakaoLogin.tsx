import { KakaoLoginBtn } from '../style';

function KakaoLogin() {
  // 1. 카카오 로그인 버튼 클릭 시 응답으로 반환 받은 redirect uri로 이동
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao`;
  };

  return <KakaoLoginBtn onClick={handleKakaoLogin} />;
}
export default KakaoLogin;
