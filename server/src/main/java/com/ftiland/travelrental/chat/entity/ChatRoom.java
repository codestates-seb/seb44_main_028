package com.ftiland.travelrental.chat.entity;

import com.ftiland.travelrental.common.aduit.BaseEntity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ChatRoom extends BaseEntity {

    @Id
    private String chatroomId;

    private String name;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "chatroom", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    List<ChatRoomMembers> members = new ArrayList<>();

    @OneToMany(mappedBy = "chatroom",cascade = CascadeType.ALL)
    List<ChatMessage> messages = new ArrayList<>();
}
