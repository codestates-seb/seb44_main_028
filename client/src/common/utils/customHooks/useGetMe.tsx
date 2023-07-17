import { useNavigate } from 'react-router-dom';
import { UseQueryResult, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { createUserInfo, deleteUserInfo } from '../../store/UserInfoStore';
import { IUserInfo } from '../../model/IUserInfo';
import useEncryptToken from './useEncryptToken';
import useDecryptToken from './useDecryptToken';
import { ACCESS_TOKEN } from '../../constants';

// 추후 React Query 사용하여 유저 정보 캐싱하는 로직으로 변경 예정

function useGetMe(): UseQueryResult<IUserInfo | null> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const encryptToken = useEncryptToken();
  const decryptToken = useDecryptToken();

  const getMe = async (): Promise<IUserInfo | null | undefined> => {
    console.log('getMe 호출');
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);

    console.log(
      '1. localstorage에서 꺼내온 accessToken:',
      encryptedAccessToken,
    );
    // 1. 액세스 토큰이 없으면 로그인 페이지로 이동
    if (!encryptedAccessToken || !process.env.REACT_APP_SECRET_KEY) {
      navigate('/login');
      return null;
    }

    const accessToken: string = decryptToken(encryptedAccessToken);
    console.log('2. 복호화된 accessToken:', accessToken);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/members`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        },
      );
      const data = response.data;

      // 유저 정보 store에 저장
      dispatch(createUserInfo(data));
      console.log('3. getMe response:', data);
      console.log(
        '4. Headers에 있는 Authorization:',
        response.headers?.Authorization,
      );
      // 5. accessToken이 만료되었으면 재발급 받아서 localStorage에 저장
      if (response.headers?.Authorization) {
        const newAccessToken = response.headers.Authorization.split(' ')[1];
        console.log('5. 재발급 받은 accessToken:', newAccessToken);
        localStorage.setItem(ACCESS_TOKEN, encryptToken(newAccessToken));
      }
      return data;
    } catch (error: AxiosError | any) {
      console.log('error가 난거니? 뭠미?', error.response.status);
      const statusCode = error.response.status;
      // unauthorized일 경우 로그인 페이지로 리디렉트
      if (statusCode === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        dispatch(deleteUserInfo());
        navigate('/login');
        // 서버 에러 발생시 콘솔에 에러 로그 출력
      } else if (statusCode >= 500 && statusCode < 600) {
        console.error('Internal Server Error', error);
      } else {
        console.error(error);
      }
    }
  };

  return useQuery('me', getMe, {
    staleTime: 5 * 60 * 1000, // 5분동안 데이터가 신선하다고 간주
    cacheTime: 30 * 60 * 1000, // 30분동안 캐시를 유지
  });
}
export default useGetMe;
