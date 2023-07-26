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
import useDecryptToken from '../../../common/utils/customHooks/useDecryptToken';

function makeChatRoomName(senderId: number, receiverId: number) {
  const chatRoomName = [String(senderId), String(receiverId)].sort().join('');
  return chatRoomName;
}

const fetchChatRoomExistsOrNot = async (
  productId: string | undefined,
  accessToken: string,
) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/chat/seller?productId=${productId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

const createChatRoom = async (
  productId: string | undefined,
  accessToken: string,
  name: string,
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/chat`,
      {
        productId: productId,
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.error('Failed to create chat room:', error);
    throw error;
  }
};

const fetchChatRoomId = async (
  productId: string | undefined,
  accessToken: string,
) => {
  try {
    // 채팅방 아이디를 가져온다.
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/chat/chatroom?productId=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch chat room:', error);
    throw error;
  }
};

function ChatBtn() {
  // 1. productId를 가져온다.
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const decrypt = useDecryptToken();
  const encryptedAccessToken = localStorage.getItem(ACCESS_TOKEN);
  const accessToken = decrypt(encryptedAccessToken || '');

  const { data: userData } = useGetMe();

  if (!userData) {
    return null;
  }

  // 3. senderId 아이디를 가져온다.
  const senderId = userData.memberId;

  console.log('내 아이디', senderId);

  const {
    data: chatRoomInfo,
    isLoading,
    error,
    isError,
  } = useQuery(
    ['chatRoomInfo', itemId],
    () => fetchChatRoomExistsOrNot(itemId, accessToken),
    {
      retry: 1,
      refetchOnWindowFocus: true,
      staleTime: 5 * 1000,
      cacheTime: 30 * 1000,
    },
  );

  // boolean 값
  console.log('채팅방 존재 여부', chatRoomInfo);
  const { sellerId, chatRoomExists } = chatRoomInfo;

  const createChatRoomMutation = useMutation(
    (name: string) => createChatRoom(itemId, accessToken, name),
    {
      onSuccess: (response) => {
        console.log('채팅방 생성 결과', response);
      },
      onError: (error) => {
        console.error('Failed to create chat room:', error);
        // TODO: 상태코드에 따른 에러 처리
      },
    },
  );

  const fetchChatRoomIdMutation = useMutation(
    () => fetchChatRoomId(itemId, accessToken),
    {
      onSuccess: (chatRoomId) => {
        console.log('채팅방 아이디', chatRoomId);
      },
      onError: (error) => {
        console.error('Failed to create chat room:', error);
        // TODO: 상태코드에 따른 에러 처리
      },
    },
  );

  const handleNavigateToChatRoom = async () => {
    if (!userData) {
      navigate('/login');
      return null;
    }
    if (chatRoomExists) {
      console.log('채팅방이 존재합니다.');
    } else {
      console.log('채팅방이 존재하지 않습니다.');
      const { data: response } = await createChatRoomMutation.mutateAsync(
        makeChatRoomName(senderId, sellerId),
      );
      console.log('채팅방 생성 완료', response);
    }
    // 채팅방 아이디를 가져온다.
    const { data: fetchChatRoomId } =
      await fetchChatRoomIdMutation.mutateAsync();
    console.log('채팅방 아이디', fetchChatRoomId);
    // navigate(`/chatting/${itemId}/${chatRoomId}`);
  };

  return (
    <>
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
    </>
  );
}
export default ChatBtn;

//
