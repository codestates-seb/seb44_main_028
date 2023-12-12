import { useNavigate } from 'react-router-dom';
import { UseQueryResult, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { IUserInfo } from '../../model/IUserInfo';
import { ACCESS_TOKEN, CACHE_TIME, STALE_TIME } from '../../constants';
import { decryptToken } from '../helperFunctions/decryptToken';
import { encryptToken } from '../helperFunctions/encryptToken';
import { QUERY_KEY } from '../queryKey';

// 추후 React Query 사용하여 유저 정보 캐싱하는 로직으로 변경 예정
function useGetMe(): UseQueryResult<IUserInfo | null> {
  const navigate = useNavigate();

  const getMe = async (): Promise<IUserInfo | null | undefined> => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);
    // 1. 액세스 토큰이 없으면 로그인 페이지로 이동
    if (!encryptedAccessToken || !process.env.REACT_APP_SECRET_KEY) {
      navigate('/login');
      return null;
    }

    const accessToken: string = decryptToken(encryptedAccessToken);

    try {
      const { headers, data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/members`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        },
      );

      // 5. accessToken이 만료되었으면 재발급 받아서 localStorage에 저장
      if (headers?.Authorization) {
        const newAccessToken = headers.Authorization.split(' ')[1];
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.setItem(ACCESS_TOKEN, encryptToken(newAccessToken));
      }

      return data;
    } catch (error: AxiosError | any) {
      const statusCode = error.response.status;
      // unauthorized일 경우 로그인 페이지로 리디렉트
      if (statusCode === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        navigate('/login');
        // 서버 에러 발생시 콘솔에 에러 로그 출력
      } else if (statusCode >= 500 && statusCode < 600) {
        console.error('Internal Server Error', error);
      } else {
        console.error(error);
      }
    }
  };

  return useQuery(QUERY_KEY.ME, getMe, {
    staleTime: STALE_TIME, // 5분동안 데이터가 신선하다고 간주
    cacheTime: CACHE_TIME, // 30분동안 캐시를 유지
  });
}
export default useGetMe;
