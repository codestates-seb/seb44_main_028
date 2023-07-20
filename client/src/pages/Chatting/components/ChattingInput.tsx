import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

type ChattingInputProps = {
  client: Client | null;
};

function ChattingInput({ client }: ChattingInputProps) {
  const { roomId } = useParams<{ roomId: string }>();
  const [newMessage, setNewMessage] = useState<string>('');

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
