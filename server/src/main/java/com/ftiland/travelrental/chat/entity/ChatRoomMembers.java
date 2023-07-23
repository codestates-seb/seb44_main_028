package com.ftiland.travelrental.chat.entity;

import com.ftiland.travelrental.common.aduit.BaseEntity;
import com.ftiland.travelrental.member.entity.Member;
import lombok.*;
import org.mapstruct.ap.internal.model.GeneratedType;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ChatRoomMembers extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="CHATROOM_ID")
    private ChatRoom chatroom;
}


