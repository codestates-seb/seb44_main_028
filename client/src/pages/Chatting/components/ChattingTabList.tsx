import { useParams } from 'react-router-dom';
import ChattingTab from './ChattingTab';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/store/RootStore';

function ChattingTabList({
  chatRoomList,
  activeChatRoomId,
}: {
  chatRoomList: any[];
  activeChatRoomId: string | undefined;
}) {
  console.log('activeChatRoomId', activeChatRoomId);
  // activeChatRoomId가 없다면 chatRoomList에 빈 채팅방을 하나 만든다.
  const lenderInfo = useSelector((state: RootState) => state.lenderInfo);
  const { displayName, imageUrl } = lenderInfo;
  console.log('lenderInfo', lenderInfo);
  console.log('chatRoomList', chatRoomList);
  if (!activeChatRoomId) {
    chatRoomList?.unshift({
      chatRoomId: '',
      displayName,
      imageUrl,
      roomName: '',
      lastMessage: '',
    });
  }
  console.log('채팅방 목록', chatRoomList);

  return (
    <ul>
      {chatRoomList?.map((chatRoom, idx) => {
        return (
          <ChattingTab
            key={idx}
            chatRoom={chatRoom}
            isActive={chatRoom.chatRoomId === activeChatRoomId}
          ></ChattingTab>
        );
      })}
    </ul>
  );
}
export default ChattingTabList;
