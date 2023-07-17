package com.ftiland.travelrental.chat.dto;

import com.ftiland.travelrental.chat.service.ChatDtoService;
import com.ftiland.travelrental.chat.service.ChatEntityService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;



@Setter
@Getter
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomDto {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();



    public void handlerActions(WebSocketSession session, ChatMessageDto chatMessage, ChatDtoService chatDtoService, ChatEntityService chatEntityService) {


        if (chatMessage.getType().equals(ChatMessageDto.MessageType.CONNECT)) {
            sessions.add(session);

            log.info(String.format("[ Connect : %s ]",roomId));
            log.info(String.format("Now connected session count : %d",sessions.size()));
        }


        else if (chatMessage.getType().equals(ChatMessageDto.MessageType.TALK)){


            sendMessage(chatMessage, chatDtoService);
            chatEntityService.storeChatMessage(chatMessage.getRoomId(), chatMessage.getContent(), chatMessage.getSenderId());
        }
    }

    private <T> void sendMessage(T message, ChatDtoService chatDtoService) {
        sessions.parallelStream()
                .forEach(session -> chatDtoService.sendMessage(session, message));
    }

    public void removeSession(ChatDtoService chatDtoService, ChatEntityService chatEntityService, WebSocketSession session){
        sessions.remove(session);
        int size = sessions.size();

        log.info(String.format("[ Disconnect : %s ]",roomId));
        log.info(String.format("Now connected session count : %d",size));


        if(size==0){
            chatDtoService.removeChatRoom(roomId);
        }
    }
}
