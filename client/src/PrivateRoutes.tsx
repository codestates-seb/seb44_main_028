import { Navigate, Outlet } from 'react-router-dom';
import { UseQueryResult } from 'react-query';
import useGetMe from './common/utils/customHooks/useGetMe';
import Loading from './common/components/Loading';
import { IUserInfo } from './common/model/IUserInfo';

function PrivateRoutes() {
  const { data, isLoading }: UseQueryResult<IUserInfo | null> = useGetMe();

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    // 로그인되지 않은 상태라면 로그인 페이지로 리디렉션
    return <Navigate to="/login" />;
  }

  // 로그인된 상태라면 자식 라우트를 렌더링
  return <Outlet />;
}
export default PrivateRoutes;
