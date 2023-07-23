// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Client } from '@stomp/stompjs';
// import { useWebSocket } from '../../../WebSocketProvider';
// import { ACCESS_TOKEN } from '../../Login/constants';
// import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
// import useGetMe from '../../../common/utils/customHooks/useGetMe';
// import styled from 'styled-components';

// const MessageWrapper = styled.div`
//   height: 100px;
//   width: 500px;
//   overflow: auto;
//   border: 1px solid red;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
// `;

// const Message = styled.p`
//   border: 1px solid black;
// `;

// function ChatRoomArea() {
//   const { roomId } = useParams<{ roomId: string }>();
//   const decrypt = useDecryptToken();
//   const [client, setClient] = useState<Client | null>(null);
//   const encryptedToken = localStorage.getItem(ACCESS_TOKEN);
//   const accessToken = decrypt(encryptedToken || '');

//   const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
//   const [messages, setMessages] = useState<string[]>([]);
//   const [newMessage, setNewMessage] = useState<string>('');

//   const { data: userData } = useGetMe();

//   const handleNewMessage = (message: any) => {
//     // setMessages((prevMessages) => [...prevMessages, message]);
//     setMessages((prevMessages) => {
//       // Check if the message already exists in the state
//       if (!prevMessages.includes(message)) {
//         return [...prevMessages, message];
//       }
//       return prevMessages;
//     });
//   };

//   console.log('userData', userData);
//   console.log('message', {
//     type: 'CONNECT',
//     content: '',
//     senderId: `${userData?.memberId}`,
//     roomId: '32ec1906-05bd-40f2-83b5-f891c4ffc753',
//   });

//   const connectWebSocket = () => {
//     const socket = new WebSocket('wss://playpack.shop/ws/chat');

//     socket.onopen = () => {
//       if (socket) {
//         const message = {
//           type: 'CONNECT',
//           content: '',
//           senderId: `${userData?.memberId}`,
//           roomId: '32ec1906-05bd-40f2-83b5-f891c4ffc753',
//         };
//         socket.send(JSON.stringify(message));
//       }
//       console.log('WebSocket connected');
//     };

//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data).content;
//       console.log('WebSocket message received:', JSON.parse(event.data));
//       handleNewMessage(message);
//     };

//     socket.onerror = (error) => {
//       console.log('WebSocket Error', error);
//     };

//     socket.onclose = (event) => {
//       console.log(
//         'WebSocket connection closed with code:',
//         event.code,
//         'and reason:',
//         event.reason,
//       );
//       console.log('WebSocket connection closed. Attempting to reconnect...');
//       setWebSocket(null);
//       setTimeout(connectWebSocket, 5000);
//     };

//     setWebSocket(socket);
//   };

//   useEffect(() => {
//     connectWebSocket();

//     // return () => {
//     //   if (webSocket) {
//     //     webSocket.close();
//     //   }
//     // };
//   }, []);

//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setNewMessage(event.target.value);
//     console.log('newMessage', newMessage);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (webSocket) {
//       {
//         const message = {
//           type: 'TALK',
//           content: newMessage,
//           senderId: `${userData?.memberId}`,
//           roomId: '32ec1906-05bd-40f2-83b5-f891c4ffc753',
//         };
//         webSocket.send(JSON.stringify(message));
//       }
//     }
//     setNewMessage('');
//   };

//   return (
//     <div>
//       <MessageWrapper>
//         {messages.map((message, index) => (
//           <Message key={index}>{message}</Message>
//         ))}
//       </MessageWrapper>
//       <form onSubmit={onSubmit}>
//         <input value={newMessage} onChange={onChange} />
//         <button>전송</button>
//       </form>
//     </div>
//   );
//   // return (
//   //   <ChatRoomAreaWrapper>
//   //     <ChattingMessages client={client} />
//   //     <ChattingInput client={client} />
//   //   </ChatRoomAreaWrapper>
//   // );
// }
// export default ChatRoomArea;

//----------------------------------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import { useWebSocket } from '../../../WebSocketProvider';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import styled from 'styled-components';
import axios from 'axios';
import ChattingMessages from '../components/ChattingMessages';
import {
  ChattingInputWrapper,
  MessageSubmitButton,
  StyledChattingInput,
} from '../style';

function ChatRoomArea({
  webSocket,
  itemId,
  roomId,
}: {
  webSocket: WebSocket | null;
  itemId: any;
  roomId: any;
}) {
  // const { itemId, roomId } = useParams<{ itemId: string; roomId: string }>();
  const decrypt = useDecryptToken();
  const encryptedToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = decrypt(encryptedToken || '');

  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const { data: userData } = useGetMe();

  // const webSocket = useWebSocket(); // useWebSocket hook을 사용해서 웹소켓 가져오기

  const handleNewMessage = (message: any) => {
    setMessages((prevMessages) => {
      if (!prevMessages.includes(message)) {
        return [...prevMessages, message];
      }
      return prevMessages;
    });
  };

  useEffect(() => {
    if (webSocket) {
      webSocket.onopen = () => {
        console.log('WebSocket connected');

        console.log('roomId', roomId);

        const message = {
          type: 'CONNECT',
          content: '',
          senderId: `${userData?.memberId}`,
          roomId: `${roomId}`,
          // roomId: '32ec1906-05bd-40f2-83b5-f891c4ffc753',
        };

        webSocket.send(JSON.stringify(message));
      };

      webSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log('WebSocket message received:', JSON.parse(event.data));
        handleNewMessage(message);
      };

      webSocket.onerror = (error) => {
        console.log('WebSocket Error', error);
      };

      webSocket.onclose = (event) => {
        console.log(
          'WebSocket connection closed with code:',
          event.code,
          'and reason:',
          event.reason,
        );
      };
    }
  }, [webSocket, roomId]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newMessage.length === 0) return;
    if (webSocket) {
      const message = {
        type: 'TALK',
        content: newMessage,
        senderId: `${userData?.memberId}`,
        roomId: `${roomId}`,
        // roomId: '32ec1906-05bd-40f2-83b5-f891c4ffc753',
      };
      webSocket.send(JSON.stringify(message));
    }
    setNewMessage('');
  };

  return (
    <div>
      <ChattingMessages messages={messages} />
      <ChattingInputWrapper onSubmit={onSubmit}>
        <StyledChattingInput
          value={newMessage}
          onChange={onChange}
          placeholder="메세지를 입력하세요."
        />
        <MessageSubmitButton />
      </ChattingInputWrapper>
    </div>
  );
}

export default ChatRoomArea;
