import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { KakaoLoginBtn } from '../style';

function RedirectPage() {
  const navigate = useNavigate();
  const getAccessToken = () => {
    console.log('location', location);
    const access_token: string | null = new URLSearchParams(
      location.search,
    ).get('access_token');
    console.log(access_token);
    if (access_token) {
      localStorage.setItem('playback-token', access_token);
    } else {
      console.log('no authorizationCode');
    }
    navigate('/');
  };

  const getMember = async () => {
    const access_token = localStorage.getItem('playback-token');
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
  return null;
}
export default RedirectPage;
