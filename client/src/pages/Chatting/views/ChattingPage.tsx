import ChatRoomList from './ChatRoomList';
import ChatRoomArea from './ChatRoomArea';
import { ChattingPageContainer } from '../style';

function ChattingPage() {
  return (
    <ChattingPageContainer>
      <ChatRoomList />
      <ChatRoomArea />
    </ChattingPageContainer>
  );
}
export default ChattingPage;
