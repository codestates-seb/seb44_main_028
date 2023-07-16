import ChatRoomList from '../components/ChatRoomList';
import ChattingArea from '../components/ChattingArea';

function ChattingPage() {
  return (
    <>
      // ChatRoomList는 채팅방 목록을 보여줍니다.
      <ChatRoomList />
      // ChattingArea는 ChatRoomList에서 선택한 채팅방의 roomId를 사용합니다.
      <ChattingArea />
    </>
  );
}
export default ChattingPage;
