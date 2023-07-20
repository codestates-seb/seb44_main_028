import { ChattingTab } from '../style';

function ChattingTabList({ chatRoomList }: { chatRoomList: any[] }) {
  console.log(chatRoomList);

  return (
    <ul>
      {chatRoomList.map((chatRoom, idx) => {
        return (
          <ChattingTab key={idx}>
            <div>
              <h3>chatroomId: {chatRoom?.chatroomId}</h3>
            </div>
          </ChattingTab>
        );
      })}
    </ul>
  );
}
export default ChattingTabList;
