package com.ftiland.travelrental.chat.entity;

import com.ftiland.travelrental.common.aduit.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ChatMessage extends BaseEntity {

    @Id
    private String messageId;
    private String content;
    private Long senderId;
    private LocalDateTime createAt;

    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    ChatRoom chatroom;



}