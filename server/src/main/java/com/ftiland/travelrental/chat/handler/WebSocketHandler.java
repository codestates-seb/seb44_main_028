package com.ftiland.travelrental.chat.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ftiland.travelrental.chat.dto.ChatMessageDto;
import com.ftiland.travelrental.chat.dto.ChatRoomDto;
import com.ftiland.travelrental.chat.entity.ChatRoom;
import com.ftiland.travelrental.chat.repository.ChatRoomMembersRepository;
import com.ftiland.travelrental.chat.repository.ChatRoomRepository;
import com.ftiland.travelrental.chat.service.ChatDtoService;
import com.ftiland.travelrental.chat.service.ChatEntityService;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper;
    private ChatDtoService chatDtoService;
    private ChatEntityService chatEntityService;
    private ChatRoomRepository chatRoomRepository;
    private ChatRoomMembersRepository chatRoomMembersRepository;

    private MultiValueMap<String,String> sessions = new LinkedMultiValueMap<>();

    @Autowired
    public void WebSocketHandler(ChatEntityService chatEntityService, ChatDtoService chatDtoService, ChatRoomRepository chatRoomRepository, ChatRoomMembersRepository chatRoomMembersRepository) {
        this.chatEntityService = chatEntityService;
        this.chatDtoService = chatDtoService;
        this.chatRoomRepository = chatRoomRepository;
        this.chatRoomMembersRepository = chatRoomMembersRepository;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        String payload = message.getPayload();
        log.info("{}", payload);
        ChatMessageDto chatMessage = objectMapper.readValue(payload, ChatMessageDto.class);
        String roomId = chatMessage.getRoomId();

        if(chatEntityService.verifyChatroomMember(roomId,chatMessage.getSenderId())==false){
            log.error("[ Invalid chat access ]");
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        if(chatMessage.getType()== ChatMessageDto.MessageType.CONNECT){
            sessions.add(session.getId(),roomId);
        }

        if (chatDtoService.findUseChatRoom(roomId)== false) {

            ChatRoom preChatRoom = chatRoomRepository.findById(roomId).orElseThrow(()->new BusinessLogicException(ExceptionCode.NOT_EXISTS));

            ChatRoomDto chatRoom = ChatRoomDto.builder()
                    .roomId(roomId)
                    .name(preChatRoom.getName())
                    .sessions(new HashSet<>())
                    .build();
            chatDtoService.putChatRooms(roomId, chatRoom);
            chatRoom.handlerActions(session, chatMessage, chatDtoService, chatEntityService);
        }


        else if(chatDtoService.findUseChatRoom(roomId)==true){

            ChatRoomDto chatRoom = chatDtoService.findRoomById(chatMessage.getRoomId());
            chatRoom.handlerActions(session, chatMessage, chatDtoService, chatEntityService);
        }
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{

        List<String> roomIdList = sessions.get(session.getId());

        if(roomIdList.size()>0) {
            sessions.remove(session.getId());

            for (String roomId : roomIdList) {
                ChatRoomDto chatRoom = chatDtoService.findRoomById(roomId);
                chatRoom.removeSession(chatDtoService, chatEntityService, session);
            }
        }
    }
}