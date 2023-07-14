import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMe from '../../../common/utils/customHooks/useGetMe';

function ChatIcon() {
  const navigate = useNavigate();
  const [senderId, setSenderId] = useState<number>(0);
  const { data: userData } = useGetMe();
  if (!userData) return null;
  const receiverId = userData.memberId;

  console.log('리시버 아이디', receiverId);

  function makeChatRoomName(senderId: number, receiverId: number) {
    const chatRoomName = [String(senderId), String(receiverId)].sort().join('');
    return chatRoomName;
  }

  const fetchSeller = async () => {
    try {
      const response = await axios.get('/api/seller');
      setSenderId(response.data.id);
    } catch (error) {
      console.error('Failed to fetch seller:', error);
    }
  };

  // 판매자의 memberId를 가져온다.
  useEffect(() => {
    fetchSeller();
  }, []);

  // 판매자의 memberId를 이용해 채팅방을 생성한다. TODO: 추후 custom hook으로 분리할 예정
  const createChatRoom = async () => {
    try {
      const response = await axios.post('/api/chat', {
        senderId,
        receiverId,
        name: makeChatRoomName(senderId, receiverId),
      });

      const chatRoomId = response.data.roomId;
      // post 요청을 보낸 후, 채팅방으로 이동한다.
      navigate(`/chat/${chatRoomId}`);
    } catch (error) {
      console.error('Failed to create chat room:', error);
    }
  };

  return <button onClick={createChatRoom}>채팅하기</button>;
}
export default ChatIcon;
