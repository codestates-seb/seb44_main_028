import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ACCESS_TOKEN } from '../constants';

function RedirectPage() {
  const navigate = useNavigate();

  const getAccessToken = () => {
    console.log('location', location);
    const access_token: string | null = new URLSearchParams(
      location.search,
    ).get('access_token');
    console.log(access_token);
    if (access_token) {
      localStorage.setItem(ACCESS_TOKEN, access_token);
    } else {
      console.log('no authorizationCode');
    }
    navigate('/');
  };

  const getMember = async () => {
    const access_token = localStorage.getItem(ACCESS_TOKEN);
    console.log('test', access_token);
    if (access_token) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/members`,
          {
            headers: { Authorization: 'Bearer ' + access_token },
          },
        );
        console.log('data:', data);

        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAccessToken();
    getMember();
  }, [window.location.pathname]);
  // // 4. 인가 코드를 back으로 보냄
  // const encryptedAuthorizationCode: string | null =
  //   localStorage.getItem('authorizationCode');
  // let authorizationCode: string | null = null;

  // if (encryptedAuthorizationCode) {
  //   authorizationCode = decrypt(encryptedAuthorizationCode);
  // }

  // console.log(
  //   '3. localStorage에서 가져온 authorizationCode',
  //   authorizationCode,
  // );

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
  return null;
}
export default RedirectPage;
