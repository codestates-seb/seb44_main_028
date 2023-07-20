import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChattingInput from '../components/ChattingInput';
import ChattingMessages from '../components/ChattingMessages';
import { ChatRoomAreaWrapper } from '../style';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';

function ChatRoomArea() {
  const { roomId } = useParams<{ roomId: string }>();
  const decrypt = useDecryptToken();
  const [client, setClient] = useState<Client | null>(null);
  const encryptedToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = decrypt(encryptedToken || '');

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () =>
        new SockJS(process.env.REACT_APP_API_URL + '/chat'),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    newClient.onConnect = () => {
      console.log('Connected to WebSocket server.');
    };

    newClient.activate();
    setClient(newClient);

    newClient.onWebSocketError = (error) => {
      console.log('WebSocket Error', error);
    };

    return () => {
      if (newClient.connected) {
        newClient.deactivate();
      }
    };
  }, [accessToken]);
  console.log('client', client);
  return (
    <ChatRoomAreaWrapper>
      <ChattingMessages client={client} />
      <ChattingInput client={client} />
    </ChatRoomAreaWrapper>
  );
}
export default ChatRoomArea;
