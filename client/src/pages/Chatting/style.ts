import styled from 'styled-components';
import { colorPalette } from '../../common/utils/enum/colorPalette';

export const ChattingPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
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

type StyledProps = {
  chatRoom: any;
  isActive: boolean;
  onClick: any;
};

export const StyledChattingTab = styled.li<StyledProps>`
  width: 100%;
  height: 120px;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 5px;

  &:hover {
    background-color: #f5f5f5;
  }
`;

type MessageProps = {
  isMyMessage: boolean;
};

export const MessagesContainer = styled.div`
  margin-top: 100px;
  height: 70vh;
  width: 85vw;
  border: 1px solid ${colorPalette.grayColor};
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const MessageWrapper = styled.div<MessageProps>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${(props) => (props.isMyMessage ? 'justify-content: flex-end' : '')};
  min-width: 300px;
`;

export const MessageBox = styled.div<MessageProps>`
  display: grid;
  grid-template-columns: auto auto 60px;
  grid-template-rows: auto;
  grid-template-areas:
    'timestamp name profile'
    'message message profile';
  padding: 10px 10px 10px 10px;
  min-height: 50px;
  width: 70%;
`;

export const ChatTimestamp = styled.h6`
  grid-area: timestamp;
  font-weight: 100;
`;

export const MessageContent = styled.p`
  grid-area: message;
  word-wrap: break-word;
  word-break: break-all;
  width: 90%;
  text-align: right;
  font-size: 15px;
`;

export const ProfileWrapper = styled.div`
  grid-area: profile;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60px;
`;

type ProfileImgProps = {
  isMyMessage?: boolean;
  src: string;
  alt: string;
};

export const ProfileImg = styled.img<ProfileImgProps>`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  ${(props) => (props.isMyMessage ? 'align-self: flex-end' : '')};
`;

type ChattingInputWrapperProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const ChattingInputWrapper = styled.form<ChattingInputWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

export const StyledChattingInput = styled.input`
  padding: 0 20px;
  width: 120%;
  height: 50px;
  border: 2px solid ${colorPalette.grayColor};
  border-radius: 7px;
  outline: none;
`;

export const MessageSubmitButton = styled.button`
  width: 7%;
  height: 50px;
  border: none;
  border-radius: 7px;
  outline: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  background-image: url(/message.png);
  background-repeat: no-repeat;
  background-position: center;
`;

export const DisplayName = styled.h3`
  grid-area: name;
  text-align: right;
  width: 95%;
  font-weight: 500;
`;
