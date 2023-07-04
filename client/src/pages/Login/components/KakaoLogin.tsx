import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { KakaoLoginBtn } from '../style';
import { useDispatch } from 'react-redux';
import { createUserInfo } from '../../../common/store/UserInfoStore';

const fetchUserData = async (code: string | null) => {
  if (!code) return;
  const { data } = await axios.get(
    `https://playpack.shop/api/members/me?code=${code}`,
  );
  return data;
};

function KakaoLogin() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [authorizationCode, setAuthorizationCode] = useState<string | null>('');

  // 4. 인가 코드를 이용하여 유저 정보를 가져옴
  const {
    data: userData,
    isError,
    error,
  } = useQuery(
    ['user', authorizationCode],
    () => fetchUserData(authorizationCode),
    {
      enabled: !!authorizationCode,
    },
  );
  console.log('유저 정보', userData);

  if (isError) {
    console.log(error);
  }

  // 5. 유저 정보를 store에 저장
  useEffect(() => {
    if (userData) {
      dispatch(
        createUserInfo({
          displayName: userData.displayName,
          latitude: userData.latitude,
          longitude: userData.longitude,
        }),
      );
    }
  }, [userData]);

  // 1. 카카오 로그인 버튼 클릭 시 응답으로 반환 받은 redirect uri로 이동
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

  // 3. redirect uri에서 인가 코드를 추출하여 state에 저장
  const getAuthorizationCode = () => {
    const authorizationCode = new URLSearchParams(location.search).get('code');
    if (authorizationCode) {
      console.log('인가 코드', authorizationCode);
      setAuthorizationCode(authorizationCode);
    } else {
      console.log('no authorizationCode');
    }
  };

  // 2. redirect uri로 이동 후 인가 코드 추출하는 함수 호출
  useEffect(() => {
    getAuthorizationCode();
  }, [location]);

  return <KakaoLoginBtn onClick={handleKakaoLogin} />;
}
export default KakaoLogin;
