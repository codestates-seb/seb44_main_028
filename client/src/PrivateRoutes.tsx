import { Navigate, Outlet } from 'react-router-dom';
import { ACCESS_TOKEN } from './pages/Login/constants';

function PrivateRoutes() {
  // TODO: 로그인 여부를 store에서 가져오기
  const isLoggedIn = localStorage.getItem(ACCESS_TOKEN);

  // TODO: 로그인 여부에 따라서 라우팅 처리
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRoutes;
