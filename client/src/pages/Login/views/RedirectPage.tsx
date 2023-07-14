import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import useEncryptToken from '../../../common/utils/customHooks/useEncryptToken';
import { ACCESS_TOKEN } from '../constants';

function RedirectPage() {
  const navigate = useNavigate();
  const encrypt = useEncryptToken();

  const { refetch: fetchGetMe } = useGetMe();

  const getAccessToken = async () => {
    const accessToken: string | null = new URLSearchParams(location.search).get(
      ACCESS_TOKEN,
    );

    if (accessToken) {
      await localStorage.setItem(ACCESS_TOKEN, encrypt(accessToken));
      //<--- 토큰 암호화로 인해 정보를 읽어오지 못해서 포스트 맨에 401에러가 뜨는 것 입니다.
      // 암호화 해서 사용하려면 디코딩 해서 불러와야한다.
      // await localStorage.setItem(ACCESS_TOKEN, accessToken);
      await fetchGetMe();
    } else {
      console.log('no access token');
    }
    navigate('/');
  };

  useEffect(() => {
    getAccessToken();
  }, [window.location.pathname]);

  return null;
}
export default RedirectPage;
