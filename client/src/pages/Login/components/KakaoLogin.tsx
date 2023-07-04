import axios from 'axios';
import { KakaoLoginBtn } from '../style';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function KakaoLogin() {
  const location = useLocation();
  const [authorizationCode, setAuthorizationCode] = useState('');
  const handleKakaoLogin = async () => {
    try {
      const response = await axios.get('https://playpack.shop/api/members/me');
      if (response.status === 200) {
        window.location.href = response.data.uri;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorizationCode = () => {
    const authorizationCode = new URLSearchParams(location.search).get('code');
    if (authorizationCode) {
      console.log('인가 코드', authorizationCode);
      setAuthorizationCode(authorizationCode);
    } else {
      console.log('no authorizationCode');
    }
  };

  useEffect(() => {
    getAuthorizationCode();
  }, [location]);
  return <KakaoLoginBtn onClick={handleKakaoLogin} />;
}
export default KakaoLogin;
