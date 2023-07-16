import { useState } from 'react';
import ChattingInput from '../components/ChattingInput';
import ChattingMessages from '../components/ChattingMessages';
import { ChatRoomAreaWrapper } from '../style';

function ChatRoomArea() {
  return (
    <ChatRoomAreaWrapper>
      <ChattingMessages />
      <ChattingInput />
    </ChatRoomAreaWrapper>
  );
}
export default ChatRoomArea;
