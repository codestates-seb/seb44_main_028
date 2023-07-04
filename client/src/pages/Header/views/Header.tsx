import React from 'react';
import { MdSearch, MdSend, MdLogout } from 'react-icons/md';
import { LogoText, NavMenu } from '../constants';
import {
  HeaderContainer,
  LogoWrapper,
  NavWrapper,
  NavList,
  NavIconWrapper,
  ActionWrapper,
} from '../style';

function Header() {
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
          <MdSearch />
          <MdSend />
        </NavIconWrapper>
      </NavWrapper>
      <ActionWrapper>
        <MdLogout />
      </ActionWrapper>
    </HeaderContainer>
  );
}
export default Header;
