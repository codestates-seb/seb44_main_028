package com.ftiland.travelrental.chat.dto;

import lombok.Getter;
import lombok.Setter;

public class RequestDto {

    @Setter
    @Getter
    public static class Post{
        private String name;
        private long senderId;
        private String productId;
        private Long receiverId;

    }

    @Setter
    @Getter
    public static class GetChatMessage {
        private String chatroomId;
    }

    @Setter
    @Getter
    public static class GetChatRoom{
        private Long memberId;
    }
}
