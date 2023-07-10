import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main/views/MainPage';
import MyPage from './pages/MyPage/views/MyPage';
import LoginPage from './pages/Login/views/LoginPage';
import ItemListPage from './pages/ItemList/views/ItemListPage';
import DetailPage from './pages/Detail/views/DetailPage';
import CreatePage from './pages/Create/views/CreatePage';
import UpdatePage from './pages/Update/views/UpdatePage';
import ChattingPage from './pages/Chatting/views/ChattingPage';
import BookingPage from './pages/Booking/views/BookingPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/itemlist/:categoryId" element={<ItemListPage />} />
      <Route path="/booking/:itemId" element={<BookingPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/detail/:itemId" element={<DetailPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/update/:itemId" element={<UpdatePage />} />
      <Route path="/chatting" element={<ChattingPage />} />
    </Routes>
  );
}
export default Router;
