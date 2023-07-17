import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import BigDefaultBtn from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';

function makeChatRoomName(senderId: number, receiverId: number) {
  const chatRoomName = [String(senderId), String(receiverId)].sort().join('');
  return chatRoomName;
}

function ChatBtn() {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState<number>(0);

  // 판매자의 memberId를 가져온다.
  useEffect(() => {
    const fetchReceiverId = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API_URL +
            `/api/chat/seller?product-id=${itemId}`,
        );
        // 컴포넌트가 아직 마운트된 상태라면 상태를 설정
        setReceiverId(response.data.sellerId);
      } catch (error) {
        console.error('Failed to fetch seller:', error);
      }
    };
    fetchReceiverId();
  }, []);

  const { data: userData } = useGetMe();
  if (!userData) {
    navigate('/login');
    return null;
  }
  const senderId = userData.memberId;

  console.log('내 아이디', senderId);

  // 판매자의 memberId를 이용해 채팅방을 생성한다. TODO: 추후 custom hook으로 분리할 예정
  const createChatRoom = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/chat',
        {
          senderId,
          receiverId,
          name: makeChatRoomName(senderId, receiverId),
        },
      );

      const chatRoomId = response.data.roomId;
      // post 요청을 보낸 후, 채팅방으로 이동한다.
      navigate(`/chatting/${chatRoomId}`);
    } catch (error) {
      console.error('Failed to create chat room:', error);
      // TODO: 상태코드에 따른 에러 처리
    }
  };

  return (
    <BigDefaultBtn
      color="inherit"
      backgroundColor={colorPalette.modalCancelButtonColor}
      hoverBackgroundColor={colorPalette.modalCancelHoverColor}
      height={64}
      width={100}
      onClick={createChatRoom}
    >
      채팅하기
    </BigDefaultBtn>
  );
}
export default ChatBtn;
