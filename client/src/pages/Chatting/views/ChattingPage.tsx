import ChatRoomList from './ChatRoomList';
import ChatRoomArea from './ChatRoomArea';
import { ChattingPageContainer } from '../style';
import { useWebSocket } from '../../../WebSocketProvider';
import { useParams } from 'react-router-dom';

function ChattingPage() {
  const webSocket = useWebSocket();
  const { itemId, chatRoomId } = useParams<{
    itemId: string;
    chatRoomId: string;
  }>();
  return (
    <ChattingPageContainer>
      {/* <ChatRoomList /> */}
      <ChatRoomArea webSocket={webSocket} itemId={itemId} roomId={chatRoomId} />
    </ChattingPageContainer>
  );
}
export default ChattingPage;
