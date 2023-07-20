import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChattingInput from '../components/ChattingInput';
import ChattingMessages from '../components/ChattingMessages';
import { ChatRoomAreaWrapper } from '../style';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import useGetMe from '../../../common/utils/customHooks/useGetMe';

function ChatRoomArea() {
  const { roomId } = useParams<{ roomId: string }>();
  const decrypt = useDecryptToken();
  const [client, setClient] = useState<Client | null>(null);
  const encryptedToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = decrypt(encryptedToken || '');

  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const { data: userData } = useGetMe();

  const handleNewMessage = (message: any) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const connectWebSocket = () => {
    const socket = new WebSocket('wss://playpack.shop/ws/chat');

    socket.onopen = () => {
      console.log('WebSocket connected');
      // Perform any additional actions when the WebSocket connection is established
      if (socket) {
        const message = {
          type: 'CONNECT',
          content: '',
          senderId: `${userData?.memberId}`,
          roomId: `${roomId}`,
        };
        socket.send(JSON.stringify(message));
      }
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log('WebSocket message received:', message);
      handleNewMessage(message);
    };

    socket.onerror = (error) => {
      console.log('WebSocket Error', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed. Attempting to reconnect...');
      // Attempt to reconnect after a certain interval
      setTimeout(connectWebSocket, 2000);
    };

    setWebSocket(socket);
  };

  useEffect(() => {
    connectWebSocket();

    // return () => {
    //   if (webSocket) {
    //     webSocket.close();
    //   }
    // };
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
    console.log('newMessage', newMessage);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (webSocket) {
      {
        const message = {
          type: 'TALK',
          content: newMessage,
          senderId: `${userData?.memberId}`,
          roomId: `${roomId}`,
        };
        webSocket.send(JSON.stringify(message));
      }
    }
    setNewMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input value={newMessage} onChange={onChange} />
        <button>전송</button>
      </form>
    </div>
  );
  // return (
  //   <ChatRoomAreaWrapper>
  //     <ChattingMessages client={client} />
  //     <ChattingInput client={client} />
  //   </ChatRoomAreaWrapper>
  // );
}
export default ChatRoomArea;
