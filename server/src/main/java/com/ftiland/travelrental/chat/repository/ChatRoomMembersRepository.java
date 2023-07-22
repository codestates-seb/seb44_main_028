package com.ftiland.travelrental.chat.repository;


import com.ftiland.travelrental.chat.entity.ChatRoom;
import com.ftiland.travelrental.chat.entity.ChatRoomMembers;
import com.ftiland.travelrental.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface ChatRoomMembersRepository extends JpaRepository<ChatRoomMembers,Long> {

    @Query("SELECT c.member FROM ChatRoomMembers c WHERE c.chatroom.chatroomId =:roomId")
    List<Member> findByChatroomId(@Param("roomId") String roomId);

    @Query("SELECT c.member FROM ChatRoomMembers c WHERE c.chatroom.chatroomId =:roomId ANd c.member.memberId=:memberId")
    Optional<Member> findByChatroomIdAndMemberId(@Param("roomId")String roomId, @Param("memberId")long memberId);

    @Query("SELECT c.member FROM ChatRoomMembers c where c.chatroom.chatroomId = :roomId AND c.member.memberId != :senderId")
    Optional<Member> findByReceiverId(@Param("roomId")String roomId,@Param("senderId")Long senderId);

}
