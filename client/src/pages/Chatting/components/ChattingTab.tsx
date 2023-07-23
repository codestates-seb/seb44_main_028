import { useNavigate, useParams } from 'react-router-dom';
import { ProfileImg, StyledChattingTab } from '../style';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';

interface ChatRoom {
  chatRoomId: string;
  displayName: string;
  imageUrl?: string;
}

interface Props {
  chatRoom: ChatRoom;
  isActive: boolean;
  children?: React.ReactNode;
}

const ChattingTab: React.FC<Props> = ({ chatRoom, isActive }) => {
  const navigate = useNavigate();
  const decrypt = useDecryptToken();
  const encryptedToken = localStorage.getItem(ACCESS_TOKEN);
  const acccessToken = decrypt(encryptedToken || '');
  const { itemId } = useParams<{ itemId: string }>();

  const handleClickTab = () => {
    navigate(`/chatting/${itemId}/${chatRoom.chatRoomId}`);
    console.log('채팅방 아이디', chatRoom.chatRoomId);
    // TODO: 채팅방 아이디를 통해 채팅방 정보를 불러온다.
  };

  return (
    <StyledChattingTab
      chatRoom={chatRoom}
      isActive={isActive}
      onClick={handleClickTab}
      style={{ backgroundColor: isActive ? 'grey' : 'white' }}
    >
      <h3>{chatRoom?.displayName}</h3>
      {chatRoom?.imageUrl && (
        <ProfileImg src={chatRoom.imageUrl} alt="Chat Room Image" />
      )}
    </StyledChattingTab>
  );
};

export default ChattingTab;
