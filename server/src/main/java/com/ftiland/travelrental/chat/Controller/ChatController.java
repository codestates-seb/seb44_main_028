package com.ftiland.travelrental.chat.Controller;

import com.ftiland.travelrental.chat.dto.RequestDto;
import com.ftiland.travelrental.chat.dto.ChatRoomDto;
import com.ftiland.travelrental.chat.dto.ResponseDto;
import com.ftiland.travelrental.chat.entity.ChatMessage;
import com.ftiland.travelrental.chat.entity.ChatRoom;

import com.ftiland.travelrental.chat.mapper.ChatMapper;
import com.ftiland.travelrental.chat.repository.ChatRoomMembersRepository;
import com.ftiland.travelrental.chat.service.ChatDtoService;
import com.ftiland.travelrental.chat.service.ChatEntityService;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private ChatDtoService chatDtoService;
    private ChatMapper chatMapper;
    private ChatEntityService chatEntityService;
    private ChatRoomMembersRepository chatRoomMembersRepository;
    private ProductService productService;
    private MemberService memberService;

    @Autowired
    public void ChatController(ChatDtoService chatDtoService, ChatEntityService chatEntityService, ChatMapper chatMapper, ChatRoomMembersRepository chatRoomMembersRepository,ProductService productService,MemberService memberService){
        this.chatDtoService = chatDtoService;
        this.chatEntityService = chatEntityService;
        this.chatMapper = chatMapper;
        this.chatRoomMembersRepository= chatRoomMembersRepository;
        this.productService = productService;
        this.memberService = memberService;
    }

    @GetMapping("/seller")
    public ResponseEntity getSellerId(@Param("productId") String productId){

        ResponseDto.sellerId response = new ResponseDto.sellerId();
        response.setSellerId(productService.findSellerId(productId));

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 채팅방 생성
    @PostMapping
    public ResponseEntity createRoom(@RequestBody RequestDto.Post requestBody){

        if(chatEntityService.existsChatRooms(requestBody.getSenderId(), requestBody.getReceiverId())==true){
            return null;
        }

        ChatRoomDto chatRoomDto = chatDtoService.createRoom(requestBody.getName());
        ChatRoom chatRoom = chatEntityService.storeChatRoom(requestBody.getSenderId(), requestBody.getReceiverId(), chatRoomDto.getRoomId(), requestBody.getName());
        ResponseDto.Post response = chatMapper.chatRoomToResponseDto(chatRoomMembersRepository,chatRoom);

        return new ResponseEntity(response,HttpStatus.CREATED);
    }

    // 채팅방 이전 메세지 불러오기 case 1
    @GetMapping("/message1")
    public ResponseEntity findChatroomMessages(@Param("roomId")String roomId){
        List<ChatMessage> chatMessageList = chatEntityService.findChatroomMessages(roomId);
        ResponseDto.Messages response = chatMapper.ChatMessagesToResponseMessages(chatMessageList);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 채팅방 이전 메세지 불러오기 case 2
    @GetMapping("/message2")
    public ResponseEntity findChatRoomMessages(@Param("memberId") Long memberId){
        List<ChatMessage> chatMessageList = chatEntityService.findChatRoomMessage2(memberId);
        ResponseDto.Messages response = chatMapper.ChatMessagesToResponseMessages(chatMessageList);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 채팅방 리스트 불러오기
    @GetMapping("/chatrooms")
    public ResponseEntity findChatRooms(@Param("memberId") Long memberId){

        List<ChatRoom> chatRooms = chatEntityService.existsChatRooms(memberId);
        List<Member> senderList = new ArrayList<>();
        for (ChatRoom chatRoom : chatRooms){
            String roomId = chatRoom.getChatroomId();
            senderList.add(chatEntityService.findReceiver(memberId,roomId));
        }
        ResponseDto.ChatRooms response = chatMapper.ChatRoomsToChatRoomList(chatRooms,senderList);

        return new ResponseEntity(response,HttpStatus.OK);
    }

    // 특정 채팅방 정보 불러오기
    @GetMapping("/chatroom")
    public ResponseEntity findChatRoom(@Param("senderId") Long senderId,@Param("receiverId") Long receiverId){

        ChatRoom chatRoom = chatEntityService.findChatRoom(senderId,receiverId);
        ResponseDto.ChatRoom response = chatMapper.ChatRoomToResponseChatRoom(chatRoom);

        return new ResponseEntity(response,HttpStatus.OK);
    }
}
