import React, { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { MdSearch, MdSend, MdLogout } from 'react-icons/md';
import { LogoText, NavMenu } from '../constants';
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
    <Router>
      <HeaderContainer>
        <LogoWrapper>
          <Link to="/">{LogoText}</Link>
        </LogoWrapper>
        <NavWrapper>
          <ol>
            <NavList>
              <Link to="/mypage">{NavMenu[0]}</Link>
            </NavList>
            <NavList>
              <Link to="/create">{NavMenu[1]}</Link>
            </NavList>
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
    </Router>
  );
}
export default Header;
