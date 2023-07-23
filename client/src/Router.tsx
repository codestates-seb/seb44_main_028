import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main/views/MainPage';
import MyPage from './pages/MyPage/views/MyPage';
import LoginPage from './pages/Login/views/LoginPage';
import RedirectPage from './pages/Login/views/RedirectPage';
import ItemListPage from './pages/ItemList/views/ItemListPage';
import DetailPage from './pages/Detail/views/DetailPage';
import CreatePage from './pages/Create/views/CreatePage';
import UpdatePage from './pages/Update/views/UpdatePage';
import ChattingPage from './pages/Chatting/views/ChattingPage';
import BookingPage from './pages/Booking/views/BookingPage';
import SearchPage from './pages/Search/views/SearchPage';
import PrivateRoutes from './PrivateRoutes';
import ProfileEdit from './pages/MyPage/components/ProfileEdit';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<RedirectPage />} />
      <Route path="/itemlist/:categoryId" element={<ItemListPage />} />
      <Route path="/itemlist/search/:searchContent" element={<SearchPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/booking/:itemId" element={<BookingPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/edit" element={<ProfileEdit />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:itemId" element={<UpdatePage />} />
        <Route path="/chatting/:itemId/" element={<ChattingPage />} />
        <Route
          path="/chatting/:itemId/:chatRoomId"
          element={<ChattingPage />}
        />
      </Route>
      <Route path="/detail/:itemId" element={<DetailPage />} />
    </Routes>
  );
}
export default Router;
