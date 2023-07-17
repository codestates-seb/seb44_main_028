package com.ftiland.travelrental.chat.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageDto {
    public enum MessageType{
        CONNECT,TALK
    }
    private MessageType type;
    private String roomId;
    private long senderId;
    private String content;
}
