import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { KakaoLoginBtn } from '../style';
import { useDispatch } from 'react-redux';
import { createUserInfo } from '../../../common/store/UserInfoStore';
import useEncryptToken from '../../../common/utils/customHooks/useEncryptToken';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';

const AUTHORIZATION_CODE_API =
  'http://localhost:8080/oauth2/authorization/kakao';

const REDIRECT_URI = 'http://localhost:3000/login/callback';

const fetchAccessToken = async (code: string | null) => {
  if (!code) return;
  try {
    const { data } = await axios.post('http://localhost:8080/api/token', {
      code,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// const fetchUserData = async (code: string | null) => {
//   if (!code) return;
//   try {
//     const { data } = await axios.get(
//       `https://playpack.shop/api/members/me?code=${code}`,
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

function KakaoLogin() {
  const location = useLocation();
  const dispatch = useDispatch();
  const encrypt = useEncryptToken();
  const decrypt = useDecryptToken();

  // 1. 카카오 로그인 버튼 클릭 시 응답으로 반환 받은 redirect uri로 이동
  const handleKakaoLogin = async () => {
    try {
      // const response = await axios.get(
      //   'http://localhost:8080/login/oauth2/code/kakao',
      // );
      window.location.href = `${AUTHORIZATION_CODE_API}?redirect_uri=${REDIRECT_URI}`;

      // if (response.status === 200) {
      //   window.location.href = response.data.uri;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // 3. redirect uri에서 인가 코드를 추출하여 state에 저장
  const getAuthorizationCode = () => {
    const authorizationCode: string | null = new URLSearchParams(
      location.search,
    ).get('code');

    if (authorizationCode) {
      console.log('2. uri에서 추출한 인가 코드', authorizationCode);
      localStorage.setItem('authorizationCode', encrypt(authorizationCode));
    } else {
      console.log('no authorizationCode');
    }
  };

  // 2. redirect uri로 이동 후 인가 코드 추출하는 함수 호출
  useEffect(() => {
    getAuthorizationCode();
  }, [location]);

  // 4. 인가 코드를 복호화하여 유저 정보를 가져옴
  const encryptedAuthorizationCode: string | null =
    localStorage.getItem('authorizationCode');
  let authorizationCode: string | null = null;

  if (encryptedAuthorizationCode) {
    authorizationCode = decrypt(encryptedAuthorizationCode);
  }

  console.log(
    '3. localStorage에서 가져온 authorizationCode',
    authorizationCode,
  );

  const {
    data: tokenData,
    isError,
    error,
  } = useQuery(
    ['token', authorizationCode],
    () => fetchAccessToken(authorizationCode),
    {
      enabled: !!authorizationCode,
    },
  );

  console.log('4. 아영님께 받아온 토큰 정보', tokenData);

  if (isError) {
    console.log(error);
  }

  // const {
  //   data: userData,
  //   isError,
  //   error,
  // } = useQuery(
  //   ['user', authorizationCode],
  //   () => fetchUserData(authorizationCode),
  //   {
  //     enabled: !!authorizationCode,
  //   },
  // );
  // console.log('4. 서버에서 받아온 유저 정보', userData);

  // if (isError) {
  //   console.log(error);
  // }

  // // 5. 유저 정보를 store에 저장
  // useEffect(() => {
  //   if (userData) {
  //     dispatch(
  //       createUserInfo({
  //         displayName: userData.displayName,
  //         latitude: userData.latitude,
  //         longitude: userData.longitude,
  //       }),
  //     );
  //   }
  // }, [userData]);

  return <KakaoLoginBtn onClick={handleKakaoLogin} />;
}
export default KakaoLogin;
