import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import useEncryptToken from '../../../common/utils/customHooks/useEncryptToken';
import { ACCESS_TOKEN } from '../constants';
import useScrollToTop from '../../../common/utils/customHooks/useScrollToTop';

function RedirectPage() {
  useScrollToTop();
  const navigate = useNavigate();
  const location = useLocation();
  const encrypt = useEncryptToken();

  const { refetch: fetchGetMe } = useGetMe();

  const getAccessToken = async () => {
    try {
      console.log('location', location);
      const accessToken: string | null = new URLSearchParams(
        location.search,
      ).get('access_token');
      console.log(accessToken);
      if (accessToken)
        await localStorage.setItem(ACCESS_TOKEN, encrypt(accessToken));
      else {
        console.log('no access_token!!!!!!!!!!!!');
      }
      await fetchGetMe();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, [location]);

  return null;
}
export default RedirectPage;
