import { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { MdSearch, MdSend, MdLogout } from 'react-icons/md';
import { LogoText, NavMenuList } from '../constants';
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

function Header() {
  const [isClick, setIsClick] = useState(false);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);
  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <HeaderContainer>
      <LogoWrapper>
        <Link to="/">{LogoText}</Link>
      </LogoWrapper>
      <NavWrapper>
        <ol>
          {NavMenuList.map((NavMenu, index) => (
            <NavList key={index}>
              <Link to={NavMenu.href}>{NavMenu.title}</Link>
            </NavList>
          ))}
        </ol>
        <NavIconWrapper>
          <NavSearchForm isClick={isClick}>
            <input type="text" />
            <MdSearch onClick={handleClick} />
          </NavSearchForm>
          <NavSendIconWrapper>
            <Link to="/chatting">
              <MdSend />
            </Link>
          </NavSendIconWrapper>
        </NavIconWrapper>
      </NavWrapper>
      <ActionWrapper>
        <Link to="/login">
          <MdLogout
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
          />
        </Link>
        <LogoutInfo isHovered={isLogoutHovered}>logout</LogoutInfo>
      </ActionWrapper>
    </HeaderContainer>
  );
}
export default Header;
