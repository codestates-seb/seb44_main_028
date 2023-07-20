import { useEffect, useState } from 'react';
import axios from 'axios';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import ChattingTabList from '../components/ChattingTabList';
import { ChattingTabWrapper } from '../style';

function ChatRoomList() {
  const { data: data } = useGetMe();
  const decrypt = useDecryptToken();
  const memberId = data?.memberId;
  const encryptedToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = decrypt(encryptedToken || '');

  // TODO: 채팅방 목록 불러오기
  // memberId를 쿼리파라미터로 현재까지 참여한 모든 채팅방 목록을 불러온다.
  const [chatRoomList, setChatRoomList] = useState<unknown[]>([]);

  useEffect(() => {
    const getChatRoomList = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/chat/chatrooms?memberId=${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        setChatRoomList(response.data.chatRooms);
      } catch (error) {
        console.log(error);
      }
    };
    getChatRoomList();
  }, [accessToken, memberId]);
  // 채팅방 목록을 불러올 때는 채팅방의 마지막 메시지를 함께 불러온다.
  // 채팅방 목록을 불러올 때는 채팅방의 참여자 정보를 함께 불러온다. (이름, 프로필 사진)
  // 채팅방을 클릭 시 해당 채팅방으로 이동하고 해당 채팅방 탭에 회색 배경이 설정된다.
  // 채팅방 목록을 불러올 때는 최신순으로 불러온다.
  return (
    <ChattingTabWrapper>
      <ChattingTabList chatRoomList={chatRoomList} />
    </ChattingTabWrapper>
  );
}
export default ChatRoomList;
