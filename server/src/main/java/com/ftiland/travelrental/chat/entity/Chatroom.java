package com.ftiland.travelrental.chat.entity;

import com.ftiland.travelrental.common.aduit.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "chatroom")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chatroom extends BaseEntity {

    @Id
    private String chatroomId;
}
