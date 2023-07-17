package com.ftiland.travelrental.chat.service;

import com.ftiland.travelrental.chat.dto.ResponseDto;
import com.ftiland.travelrental.chat.entity.ChatMessage;
import com.ftiland.travelrental.chat.entity.ChatRoom;
import com.ftiland.travelrental.chat.entity.ChatRoomMembers;

import com.ftiland.travelrental.chat.repository.ChatRoomMembersRepository;
import com.ftiland.travelrental.chat.repository.ChatMessageRepository;

import com.ftiland.travelrental.chat.repository.ChatRoomRepository;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class ChatEntityService {
    private ChatRoomRepository chatRoomRepository;
    private ChatRoomMembersRepository chatRoomMembersRepository;
    private ChatMessageRepository chatMessageRepository;
    private MemberService memberService;


    @Autowired
    public void ChatService( ChatRoomRepository chatRoomRepository, ChatMessageRepository chatMessageRepository, MemberService memberService,ChatRoomMembersRepository chatRoomMembersRepository){
        this.chatRoomRepository= chatRoomRepository;
        this.chatRoomMembersRepository=chatRoomMembersRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.memberService = memberService;
    }

    public void storeChatMessage(String roomId,String content,Long senderId){
        ChatMessage chatMessage = ChatMessage
                .builder()
                .messageId(UUID.randomUUID().toString())
                .content(content)
                .senderId(senderId)
                .roomId(roomId)
                .build();

        chatMessageRepository.save(chatMessage);
    }

    public ChatRoom storeChatRoom(long member1,long member2, String roomId, String name){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setName(name);
        chatRoom.setChatroomId(roomId);
        chatRoomRepository.save(chatRoom);

        storeChatRoomMembers(member1,chatRoom);
        storeChatRoomMembers(member2,chatRoom);

        return chatRoom;
    }

    public void storeChatRoomMembers(long memberId,ChatRoom chatRoom){
        ChatRoomMembers chatRoomMembers = ChatRoomMembers.builder()
                .chatroom(chatRoom)
                .member(memberService.findMember(memberId))
                .build();

        chatRoomMembersRepository.save(chatRoomMembers);
    }

    public boolean verifyChatroomMember(String roomId,long memberId){
        boolean validAccess = false;

        if(chatRoomMembersRepository.findByChatroomIdAndMemberId(roomId,memberId).isPresent()){
        validAccess=true;
    }

    return validAccess;
    }

    public List<ChatMessage> findChatroomMessages(String chatroomId){
        List<ChatMessage> messages = chatMessageRepository.findByRoomId(chatroomId);

        return messages;
    }

    public List<ChatRoom> findChatRoom(Long memberId){
        List<ChatRoom> rooms = chatRoomRepository.findChatRoomsByUserId(memberId);

        return rooms;
    }

    public List<ChatMessage> findChatRoomMessage2(long memberId){
        List<ChatMessage> messages = chatMessageRepository.findByMemberId(memberId);

        return messages;
    }

    public BusinessLogicException findChatRoom(Long memberId1, Long memberId2){
        if(chatRoomRepository.findChatRoomsWithMembers(memberId1,memberId2).isPresent()){
            return new BusinessLogicException(ExceptionCode.CHATROOM_ALREADY_EXISTS);
        }
        return null;
    }
}
