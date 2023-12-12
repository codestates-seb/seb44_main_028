import { useState } from 'react';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { MdSearch, MdSend, MdLogout } from 'react-icons/md';
import { NavMenuList } from '../constants';
import logo from '../../../assets/logo/logo.svg';
import {
  HeaderContainer,
  LogoWrapper,
  NavWrapper,
  NavList,
  NavIconWrapper,
  NavSendIconWrapper,
  NavSearchForm,
  ActionWrapper,
  LogoutInfo,
} from '../style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';
import { QUERY_KEY } from '../../../common/utils/queryKey';
import { useQueryClient } from 'react-query';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isClick, setIsClick] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.userInfo);
  const handleClick = () => {
    setIsClick(!isClick);
  };

  const queryClient = useQueryClient();

  const handleLoginStatus = async () => {
    if (isLoggedIn) {
      await queryClient.invalidateQueries(QUERY_KEY.ME);
      //TODO: "로그아웃 되었습니다."모달창 띄워주기
      alert('로그아웃 되었습니다.');
    }
    navigate('/login');
  };
  const handelSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchContent = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter') {
      navigate(`/itemlist/search/${searchContent}`);
    }
  };
  return (
    <HeaderContainer>
      <LogoWrapper data-testid="logo">
        <Link to="/">
          <img src={logo}></img>
        </Link>
      </LogoWrapper>
      <NavWrapper>
        <ol data-testid="list">
          {NavMenuList.map((NavMenu, index) => (
            <NavList key={index}>
              <Link to={NavMenu.href}>{NavMenu.title}</Link>
            </NavList>
          ))}
        </ol>
        <NavIconWrapper>
          <NavSearchForm isClick={isClick}>
            <input type="text" onKeyDown={handelSearch} />
            <MdSearch onClick={handleClick} />
          </NavSearchForm>
          <NavSendIconWrapper>
            <Link to="/chatting">
              <MdSend />
            </Link>
          </NavSendIconWrapper>
        </NavIconWrapper>
      </NavWrapper>
      <ActionWrapper onClick={handleLoginStatus}>
        <MdLogout
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
        />
        <LogoutInfo isHovered={isLogoutHovered}>logout</LogoutInfo>
      </ActionWrapper>
    </HeaderContainer>
  );
}
export default Header;
