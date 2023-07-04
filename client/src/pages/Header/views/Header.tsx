import React, { useEffect, useState } from 'react';
import { MdSearch, MdSend, MdLogout } from 'react-icons/md';
import { LogoText, NavMenu } from '../constants';
import {
  HeaderContainer,
  LogoWrapper,
  NavWrapper,
  NavList,
  NavIconWrapper,
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
      <LogoWrapper>{LogoText}</LogoWrapper>
      <NavWrapper>
        <ol>
          {NavMenu.map((item, idx) => {
            return <NavList key={idx}>{item}</NavList>;
          })}
        </ol>
        <NavIconWrapper>
          <NavSearchForm isClick={isClick}>
            <input type="text" />
            <MdSearch onClick={handleClick} />
          </NavSearchForm>
          <MdSend />
        </NavIconWrapper>
      </NavWrapper>
      <ActionWrapper>
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
