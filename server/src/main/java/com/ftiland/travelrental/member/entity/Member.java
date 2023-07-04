package com.ftiland.travelrental.member.entity;


import com.ftiland.travelrental.common.aduit.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
public class Member extends BaseEntity {

    @Id // UUID사용
    private String memberId;
    private String email;
    private String name;

    // 이미지 필드 필요

    private Double latitude;
    private Double longitude;

/*    private Double totalRateScore;
    private Double totalRateCount;*/
}
