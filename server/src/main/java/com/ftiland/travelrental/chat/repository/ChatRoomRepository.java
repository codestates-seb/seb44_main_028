package com.ftiland.travelrental.chat.repository;

import com.ftiland.travelrental.chat.entity.ChatRoom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.List;



public interface ChatRoomRepository extends JpaRepository<ChatRoom,String> {
    @Query("SELECT cr.chatroomId FROM ChatRoomMembers crm JOIN crm.chatroom cr WHERE crm.member.memberId = :userId")
    List<String> findChatRoomsByUserId(Long userId);

}
