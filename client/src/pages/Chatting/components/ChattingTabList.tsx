import { ChattingTab } from '../style';

function ChattingTabList({ chatRoomList }: { chatRoomList: any[] }) {
  console.log(chatRoomList);

  return (
    <ul>
      {chatRoomList.map((chatRoom, idx) => {
        return (
          <ChattingTab key={idx}>
            <div>
              <h1>chatroomId: {chatRoom?.chatroomId}</h1>
            </div>
          </ChattingTab>
        );
      })}
    </ul>
  );
}
export default ChattingTabList;
