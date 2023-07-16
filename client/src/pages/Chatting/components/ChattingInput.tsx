import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function ChattingInput() {
  const { roomId } = useParams<{ roomId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () =>
        new SockJS(process.env.REACT_APP_API_URL + '/chat'),
    });
    setClient(newClient);
  }, []);

  console.log('roomId', roomId);
  console.log('client', client);

  useEffect(() => {
    if (client) {
      client.onConnect = function (frame) {
        client.subscribe(`/topic/${roomId}`, function (message) {
          setMessages((prev) => [...prev, message.body]);
        });
      };
      client.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };
      client.activate();
    }

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, [client, roomId]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
    console.log('newMessage', newMessage);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (client) {
      client.publish({
        destination: `/app/chat/${roomId}`,
        body: newMessage,
      });
    }
    setNewMessage('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input value={newMessage} onChange={onChange} />
      <button>전송</button>
    </form>
  );
}
export default ChattingInput;
