package com.ftiland.travelrental.chat.entity;

import com.ftiland.travelrental.common.aduit.BaseEntity;

import lombok.*;

import javax.persistence.*;
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

    @OneToMany(mappedBy = "chatroom")
    List<ChatRoomMembers> members = new ArrayList<>();
}
