package com.ftiland.travelrental.chat.repository;

import com.ftiland.travelrental.chat.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage,String> {

    @Query("SELECT cm FROM ChatMessage cm WHERE cm.chatRoom.chatroomId =: roomId")
    List<ChatMessage> findByRoomId(@Param("roomId") String roomId);

    @Query("SELECT cm FROM ChatMessage cm JOIN ChatRoomMembers crm ON cm.chatRoom.chatroomId = crm.chatroom.chatroomId WHERE crm.member.memberId = :memberId ")
    List<ChatMessage> findByMemberId(@Param("memberId") long memberId);
}
