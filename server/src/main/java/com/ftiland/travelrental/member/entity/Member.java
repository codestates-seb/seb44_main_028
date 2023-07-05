package com.ftiland.travelrental.member.entity;


import com.ftiland.travelrental.common.aduit.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Member extends BaseEntity {

    @Id // 멤버의 경우 숫자형식의 id 사용
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String email;
    private String name;

    // 이미지 필드 필요

    private Double latitude;
    private Double longitude;

    public Member(String email) {
        this.email = email;
    }

/*    private Double totalRateScore;
    private Double totalRateCount;*/
}
