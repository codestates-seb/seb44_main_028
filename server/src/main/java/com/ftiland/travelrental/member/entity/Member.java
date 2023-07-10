package com.ftiland.travelrental.member.entity;


import com.ftiland.travelrental.common.aduit.BaseEntity;

import lombok.*;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Member extends BaseEntity {

    @Id // 멤버의 경우 숫자형식의 id 사용
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String displayName;

    // 이미지 필드 필요
    private Double latitude;
    private Double longitude;
    private String address;

    public Member(String email, String displayName) {
        this.email = email;
        this.displayName = displayName;
    }

    public Member(long l, String email, String displayName, double v, double v1) {
        this.email = email;
        this.displayName = displayName;
    }
}
