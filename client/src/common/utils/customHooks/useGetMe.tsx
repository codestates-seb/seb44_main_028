import { UseQueryResult, useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createUserInfo, deleteUserInfo } from '../../store/UserInfoStore';
import { IUserInfo } from '../../model/IUserInfo';
import useEncryptToken from './useEncryptToken';
import useDecryptToken from './useDecryptToken';
import { ACCESS_TOKEN } from '../../constants';
import { RootState } from '../../store/RootStore';

// 추후 React Query 사용하여 유저 정보 캐싱하는 로직으로 변경 예정

function useGetMe(): UseQueryResult<IUserInfo | null> {
  const dispatch = useDispatch();
  const encryptToken = useEncryptToken();
  const decryptToken = useDecryptToken();

  const getMe = async (): Promise<IUserInfo | null | undefined> => {
    const encryptedAccessToken: string | null =
      localStorage.getItem(ACCESS_TOKEN);

    console.log(
      '1. localstorage에서 꺼내온 accessToken:',
      encryptedAccessToken,
    );
    if (!encryptedAccessToken || !process.env.REACT_APP_SECRET_KEY) {
      return null;
    }

    const accessToken: string = decryptToken(encryptedAccessToken);
    console.log('2. 복호화된 accessToken:', accessToken);

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/members`,
        {
          headers: { Authorization: 'Bearer ' + accessToken },
        },
      );

      console.log('3. getMe response:', data === '');

      // 유저 정보 store에 저장
      dispatch(createUserInfo(data));
    } catch (error) {
      console.log('error가 난거니? 뭠미?', error);
    }

    //   if (!userData || !response?.headers.authorization) {
    //     return null;
    //   }

    //   // accessToken 재발급
    //   const newAccessToken: string =
    //     response.headers.authorization.split(' ')[1];
    //   if (newAccessToken) {
    //     localStorage.removeItem(ACCESS_TOKEN);
    //     localStorage.setItem(ACCESS_TOKEN, encryptToken(newAccessToken));
    //   }

    //   return userData;
    // } catch (error: AxiosError | any) {
    //   // refresh token 만료 시 로그아웃 처리
    //   if (error?.response?.status === 401) {
    //     localStorage.removeItem(ACCESS_TOKEN);
    //     dispatch(deleteUserInfo());
    //   } else {
    //     console.error(error);
    //   }

    //   return null;
    // }
  };

  return useQuery('me', getMe, {
    staleTime: 5 * 60 * 1000, // 5분동안 데이터가 신선하다고 간주
    cacheTime: 30 * 60 * 1000, // 30분동안 캐시를 유지
  });
}
export default useGetMe;
