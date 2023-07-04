import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  height: 4.5rem;
  padding: 1.375rem 2.625rem;
  font-size: 16px;
  border-bottom: 1px solid #cbcbcb;
  & svg,
  li {
    cursor: pointer;
  }
  & svg:hover,
  li:hover {
    color: #12d3cf;
    transition: color 0.2s ease-in-out;
  }
`;
export const LogoWrapper = styled.div`
  width: 10%;
  font-size: 24px;
  font-weight: 700;
  color: #3aa6b9;
`;
export const NavWrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  & > ol {
    display: flex;
  }
`;
export const NavList = styled.li`
  margin-right: 1.5rem;
`;
export const NavIconWrapper = styled.div`
  display: flex;
  align-items: center;
  & > svg:first-child {
    width: 20px;
    height: 20px;
  }
  & > svg:last-child {
    font-size: 18px;
    margin-right: 10.125rem;
    margin-left: 2rem;
  }
`;
export const ActionWrapper = styled.div`
  width: 5%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  & > svg {
    color: black;
    font-size: 20px;
  }
`;
