import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client } from '@stomp/stompjs';

type ChattingMessagesProps = {
  client: Client | null;
};

function ChattingMessages({ client }: ChattingMessagesProps) {
  const { roomId } = useParams<{ roomId: string }>();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (client && client.connected) {
      client.subscribe(`/topic/${roomId}`, function (message) {
        setMessages((prev) => [...prev, message.body]);
      });
    }
  }, [client, roomId]);

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
export default ChattingMessages;
