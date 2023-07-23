import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  MessageBox,
  ProfileImg,
  MessagesContainer,
  MessageWrapper,
  MessageContent,
  ProfileWrapper,
  DisplayName,
  ChatTimestamp,
} from '../style';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../Login/constants';
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import { useQuery } from 'react-query';

const fetchMessages = async (accessToken: string) => {
  const { data } = await axios.get(
    process.env.REACT_APP_API_URL +
      `/api/chat/message1?roomId=8b0db984-b5cc-444e-83d5-29acc3fb064b`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data.messages;
};

function ChattingMessages({ messages }: any) {
  const { itemId, chatRoomId } = useParams<{
    itemId: string;
    chatRoomId: string;
  }>();
  const { data: userData } = useGetMe();
  const decrypt = useDecryptToken();
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = decrypt(encryptedAccessToken || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const [pastMessages, setPastMessages] = useState<object[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  console.log('messages', userData ? userData.imageUrl : '');

  type Message = {
    senderId?: string;
    content?: string;
    displayName?: string;
  };
  console.log('messages', messages);

  const {
    data: pastMessages,
    // isError,
    isLoading,
  } = useQuery('pastMessages', () => fetchMessages(accessToken), { retry: 0 });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, pastMessages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isError) {
  //   return <div>Error...!</div>;
  // }

  const pastMessagesSorted = pastMessages.sort(
    (a: any, b: any) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  console.log('pastMessages', pastMessagesSorted);
  messages = [...pastMessagesSorted, ...messages];
  console.log('합친 messages', messages);

  return (
    <MessagesContainer>
      {messages.map((message: Message, index: number) => (
        <MessageWrapper
          key={index.toString() + new Date().getTime()}
          isMyMessage={message.senderId === userData?.memberId}
        >
          <MessageBox isMyMessage={message.senderId === userData?.memberId}>
            <DisplayName>
              <ChatTimestamp>
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </ChatTimestamp>
              {message.senderId == userData?.memberId &&
              userData?.displayName.length
                ? userData?.displayName
                : message.displayName
                ? message.displayName
                : '익명'}
            </DisplayName>
            {/* <div> */}
            <MessageContent>{message.content}</MessageContent>
            {/* </div> */}
            <ProfileWrapper>
              <ProfileImg
                src={userData?.imageUrl ? userData.imageUrl : ''}
                alt="profile"
                isMyMessage={message.senderId === userData?.memberId}
              />
            </ProfileWrapper>
          </MessageBox>
        </MessageWrapper>
      ))}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
}
export default ChattingMessages;
