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
