package com.ftiland.travelrental.chat.repository;

import com.ftiland.travelrental.chat.entity.ChatMessage;
import com.ftiland.travelrental.chat.entity.ChatRoom;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public interface ChatRoomRepository extends JpaRepository<ChatRoom,String> {
    @Query("SELECT cr FROM ChatRoomMembers crm JOIN crm.chatroom cr WHERE crm.member.memberId = :userId order by cr.updatedAt DESC")
    List<ChatRoom> findChatRoomsByUserId(Long userId);

    @Query("SELECT cr FROM ChatRoom cr JOIN cr.members crm1 JOIN cr.members crm2 WHERE crm1.member.memberId = :member1Id AND crm2.member.memberId = :member2Id")
    Optional<ChatRoom> findChatRoomsWithMembers(@Param("member1Id") long member1Id, @Param("member2Id") long member2Id);

    @Query("SELECT cr.messages FROM ChatRoom cr WHERE cr.chatroomId =:roomId")
    ArrayList<ChatMessage> findByRoomId(@Param("roomId") String roomId);

}
