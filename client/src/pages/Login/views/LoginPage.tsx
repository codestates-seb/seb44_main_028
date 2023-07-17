import axios from 'axios';
import KakaoLogin from '../components/KakaoLogin';
import { LoginPageContainer } from '../style';

function LoginPage() {
  const handleWithdrawal = () => {
    try {
      console.log('회원탈퇴');
      const response = axios.delete(
        process.env.REACT_APP_API_URL + '/api/members/',
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoginPageContainer>
      <KakaoLogin />
      <button onClick={handleWithdrawal}>회원탈퇴 임시 버튼</button>
    </LoginPageContainer>
  );
}
export default LoginPage;
