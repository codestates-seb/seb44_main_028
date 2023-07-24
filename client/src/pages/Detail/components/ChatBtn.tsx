import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetMe from '../../../common/utils/customHooks/useGetMe';
import BigDefaultBtn from '../../../common/components/Button';
import { colorPalette } from '../../../common/utils/enum/colorPalette';
import { ACCESS_TOKEN } from '../../Login/constants';
import { useMutation, useQuery } from 'react-query';
import Loading from '../../../common/components/Loading';
import ErrorPage from '../../../common/components/ErrorPage';

function makeChatRoomName(senderId: number, receiverId: number) {
  const chatRoomName = [String(senderId), String(receiverId)].sort().join('');
  return chatRoomName;
}

const fetchChatRoomExistsOrNot = async (
  productId: string | undefined,
  accessToken: string,
  senderId: number,
) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/chat/seller?productId=${productId}&senderId=${senderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

const createChatRoom = async (
  senderId: number,
  itemId: string | undefined,
  accessToken: string,
  name: string,
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/chat/chatroom`,
      {
        productId: itemId,
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const chatRoomId = response.data.chatroomId;
    return chatRoomId;
  } catch (error) {
    console.error('Failed to create chat room:', error);
    throw error;
  }
};

const fetchChatRoomId = async (
  senderId: number,
  itemId: string | undefined,
  accessToken: string,
  name: string,
) => {
  try {
    console.log('itemId', itemId);

    // 채팅방 아이디를 가져온다.
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/chat/chatroom?productId=${itemId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log('채팅방 생성 결과', response.data);
    const chatRoomId = response.data.chatroomId;
    console.log('채팅방 아이디', chatRoomId);
    return chatRoomId;
  } catch (error) {
    console.error('Failed to fetch chat room:', error);
    throw error;
  }
};

function ChatBtn() {
  // 1. productId를 가져온다.
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  // const [receiverId, setReceiverId] = useState<number>(0);
  // const [chatRoomExistsOrNot, setHasChatRoomExists] = useState<boolean>(false);
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = encryptedAccessToken || '';

  // 판매자의 memberId를 가져온다.
  // useEffect(() => {
  //   const fetchReceiverId = async () => {
  //     try {
  //       const response = await axios.get(
  //         process.env.REACT_APP_API_URL +
  //           `/api/chat/seller?productId=${itemId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         },
  //       );
  //       console.log('판매자 정보', response.data);
  //       // 컴포넌트가 아직 마운트된 상태라면 상태를 설정
  //       // setReceiverId(response.data.sellerId);
  //       // 2. 판매자의 productId를 이용해 채팅방이 존재하는지 확인한다.
  //       setHasChattingRecordWithReceiver(response.data.chatRoomExistsOrNot);
  //     } catch (error) {
  //       console.error('Failed to fetch seller:', error);
  //     }
  //   };
  //   fetchReceiverId();
  // }, []);

  const { data: userData } = useGetMe();
  if (!userData) {
    // navigate('/login');
    return null;
  }
  // 3. senderId 아이디를 가져온다.
  const senderId = userData.memberId;

  console.log('내 아이디', senderId);

  const {
    data: chatRoomExistsOrNot,
    isLoading,
    error,
    isError,
  } = useQuery(
    ['chatRoomExistsOrNot', itemId],
    () => fetchChatRoomExistsOrNot(itemId, accessToken, senderId),
    {
      retry: 1,
      refetchOnWindowFocus: true,
      staleTime: 5 * 1000,
      cacheTime: 30 * 1000,
    },
  );

  // boolean 값
  console.log('채팅방 존재 여부', chatRoomExistsOrNot);

  const createChatRoomMutation = useMutation(
    (name: string) => createChatRoom(senderId, itemId, accessToken, name),
    {
      onError: (error) => {
        console.error('Failed to create chat room:', error);
        // TODO: 상태코드에 따른 에러 처리
      },
    },
  );

  // const createChatRoomMutation = useMutation(
  //   () => fetchChatRoomId(senderId, itemId, 'das', accessToken),
  //   {
  //     onSuccess: (chatRoomId) => {
  //       console.log('채팅방 아이디', chatRoomId);
  //     },
  //     onError: (error) => {
  //       console.error('Failed to create chat room:', error);
  //       // TODO: 상태코드에 따른 에러 처리
  //     },
  //   },
  // );

  const handleNavigateToChatRoom = async () => {
    if (chatRoomExistsOrNot) {
      console.log('채팅방이 존재합니다.');
      // 채팅방이 이미 있으면 채팅방 Id를 GET 요청으로 받아서 채팅 페이지로 이동
      // const { data: chatRoomId } = await createChatRoomMutation.mutateAsync();
      // navigate(`/chatting/${itemId}/${chatRoomId}`);
    } else {
      console.log('채팅방이 존재하지 않습니다.');
      // 채팅방이 없으면 채팅방을 생성하고 채팅 페이지로 이동
      const response = await createChatRoomMutation.mutateAsync('채팅방');
      console.log('채팅방 생성 결과', response);
    }
  };

  return (
    <BigDefaultBtn
      color="inherit"
      backgroundColor={colorPalette.modalCancelButtonColor}
      hoverBackgroundColor={colorPalette.modalCancelHoverColor}
      height={64}
      width={100}
      onClick={handleNavigateToChatRoom}
    >
      채팅하기
    </BigDefaultBtn>
  );
}
export default ChatBtn;
