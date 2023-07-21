import { ChattingTab, ProfileImg } from '../style';

function ChattingTabList({ chatRoomList }: { chatRoomList: any[] }) {
  console.log(chatRoomList);

  return (
    <ul>
      {chatRoomList.map((chatRoom, idx) => {
        return (
          <ChattingTab key={idx}>
            <div>
              <h3>{chatRoom?.displayName}</h3>
              {chatRoom?.imageUrl && (
                <ProfileImg src={chatRoom.imageUrl} alt="Chat Room Image" />
              )}
            </div>
          </ChattingTab>
        );
      })}
    </ul>
  );
}
export default ChattingTabList;
