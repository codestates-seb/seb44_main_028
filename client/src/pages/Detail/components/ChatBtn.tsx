import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetMe from '../../../common/utils/customHooks/useGetMe';

function ChatBtn() {
  const navigate = useNavigate();
  const [senderId, setSenderId] = useState<number>(0);
  const { data: userData } = useGetMe();
  if (!userData) {
    navigate('/login');
    return null;
  }
  const receiverId = userData.memberId;

  console.log('리시버 아이디', receiverId);

  function makeChatRoomName(senderId: number, receiverId: number) {
    const chatRoomName = [String(senderId), String(receiverId)].sort().join('');
    return chatRoomName;
  }

  // 판매자의 memberId를 가져온다.
  // useEffect(() => {
  // let isMounted = true;
  const fetchSellerId = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + '/chat');
      // 컴포넌트가 아직 마운트된 상태라면 상태를 설정
      setSenderId(response.data.id);
    } catch (error) {
      console.error('Failed to fetch seller:', error);
    }
  };
  fetchSellerId();

  // return () => {
  //   isMounted = false; // 컴포넌트가 unmount되었음을 나타냄
  // };
  // }, []);

  // 판매자의 memberId를 이용해 채팅방을 생성한다. TODO: 추후 custom hook으로 분리할 예정
  const createChatRoom = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/chat',
        {
          senderId,
          receiverId,
          name: makeChatRoomName(senderId, receiverId),
        },
      );

      const chatRoomId = response.data.roomId;
      // post 요청을 보낸 후, 채팅방으로 이동한다.
      navigate(`/chat/${chatRoomId}`);
    } catch (error) {
      console.error('Failed to create chat room:', error);
      // TODO: 상태코드에 따른 에러 처리
    }
  };

  return <button onClick={createChatRoom}>채팅하기</button>;
}
export default ChatBtn;
