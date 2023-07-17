import { Navigate, Outlet } from 'react-router-dom';
import { UseQueryResult } from 'react-query';
import useGetMe from './common/utils/customHooks/useGetMe';
import { IUserInfo } from './common/model/IUserInfo';

function PrivateRoutes() {
  // TODO: 로그인 여부를 getMe에서 가져오기
  const { data: data }: UseQueryResult<IUserInfo | null> = useGetMe();

  // TODO: 로그인 여부에 따라서 라우팅 처리
  return data ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoutes;
