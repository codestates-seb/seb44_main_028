import styled from 'styled-components';

export const ChattingPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const ChattingTabWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 20%;
  border-right: 1px solid #e5e5e5;
`;

export const ChatRoomAreaWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ChattingTab = styled.li`
  width: 100%;
  height: 120px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
`;
