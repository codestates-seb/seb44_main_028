import { useState } from 'react';
import ChattingInput from '../components/ChattingInput';
import ChattingMessages from '../components/ChattingMessages';
import { ChatRoomAreaWrapper } from '../style';

function ChatRoomArea() {
  const [newMessage, setNewMessage] = useState<string>('');
  return (
    <ChatRoomAreaWrapper>
      <ChattingMessages />
      <ChattingInput newMessage={newMessage} setNewMessage={setNewMessage} />
    </ChatRoomAreaWrapper>
  );
}
export default ChatRoomArea;
