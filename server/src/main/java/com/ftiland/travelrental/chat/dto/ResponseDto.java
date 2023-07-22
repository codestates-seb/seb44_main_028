package com.ftiland.travelrental.chat.dto;

import com.ftiland.travelrental.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ResponseDto {

    @Getter
    @Setter
    public static class Post{
        private String roomId;
        private String name;
        List<Member> participantMembers = new ArrayList<>();

        public void addMemberId(Member member){
            this.participantMembers.add(member);
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SellerInfoForCustomer {
        private long sellerId;
        private boolean chatRoomExists;

    }

    @Getter
    @Setter
    public static class Message{
        private LocalDateTime createdAt;
        private String content;
        private Long memberId;
    }

    @Getter
    @Setter
    public static class Messages{
        List<ResponseDto.Message> messages = new ArrayList<>();

        public void addMessage(ResponseDto.Message message){this.messages.add(message);}
    }

    @Getter
    @Setter
    public static class ChatRoom{
        private String chatroomId;
    }

    @Getter
    @Setter
    public static class ElementOfChatRoomList{
        private String chatRoomId;
        private String displayName;
        private String imageUrl;
        private String roomName;
        private String lastMessage;
    }

    @Getter
    @Setter
    public static class ChatRooms{
        List<ElementOfChatRoomList> chatRooms = new ArrayList<>();

        public void addChatRoom(ResponseDto.ElementOfChatRoomList element){this.chatRooms.add(element);}
    }

}
