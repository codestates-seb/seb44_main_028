package com.ftiland.travelrental.chat.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ftiland.travelrental.chat.dto.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatDtoService {

    private final ObjectMapper objectMapper;
    private Map<String, ChatRoomDto> chatRooms;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public ChatRoomDto findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public void putChatRooms(String roomId,ChatRoomDto chatRoomDto){
        chatRooms.put(roomId,chatRoomDto);
    }

    public ChatRoomDto createRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        ChatRoomDto chatRoom = ChatRoomDto.builder()
                .roomId(randomId)
                .name(name)
                .sessions(new HashSet<WebSocketSession>())
                .build();
        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try{
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
    public void removeChatRoom(String roomId){
        chatRooms.remove(roomId);
    }

    public boolean findUseChatRoom(String roomId){
        if(chatRooms.get(roomId) == null){
            return false;
        }
        return true;
    }
}
