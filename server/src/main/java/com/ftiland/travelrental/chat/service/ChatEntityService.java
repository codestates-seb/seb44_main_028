package com.ftiland.travelrental.chat.service;

import com.ftiland.travelrental.chat.entity.ChatMessage;
import com.ftiland.travelrental.chat.entity.ChatRoom;
import com.ftiland.travelrental.chat.entity.ChatRoomMembers;

import com.ftiland.travelrental.chat.repository.ChatRoomMembersRepository;
import com.ftiland.travelrental.chat.repository.ChatMessageRepository;

import com.ftiland.travelrental.chat.repository.ChatRoomRepository;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
        ChatRoom chatRoom = chatRoomRepository.findById(roomId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.NOT_EXISTS));

        ChatMessage chatMessage = ChatMessage
                .builder()
                .messageId(UUID.randomUUID().toString())
                .content(content)
                .senderId(senderId)
                .chatroom(chatRoom)
                .createAt(LocalDateTime.now())
                .build();
        chatRoom.setUpdateAt(LocalDateTime.now());

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

    public ArrayList<ChatMessage> findChatroomMessages(String chatroomId){
        ArrayList<ChatMessage> messages = chatRoomRepository.findByRoomId(chatroomId);

        return messages;
    }

    public List<ChatRoom> existsChatRooms(Long memberId){
        List<ChatRoom> rooms = chatRoomRepository.findChatRoomsByUserId(memberId);

        return rooms;
    }

    public List<ChatMessage> findChatRoomMessage2(long memberId){
        List<ChatMessage> messages = chatMessageRepository.findByMemberId(memberId);

        return messages;
    }

    public ChatRoom findChatRoom(Long memberId,Long memberId2){
        return chatRoomRepository.findChatRoomsWithMembers(memberId,memberId2).orElseThrow(()-> new BusinessLogicException(ExceptionCode.NOT_EXISTS));
    }

    public Boolean existsChatRooms(Long memberId1, Long memberId2){
        if(chatRoomRepository.findChatRoomsWithMembers(memberId1,memberId2).isPresent()){
            return true;
        }
        return false;
    }
    public Member findReceiver(Long senderId,String roomId){
        Member receiver = chatRoomMembersRepository.findByReceiverId(roomId,senderId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return receiver;
    }
}
