package com.ftiland.travelrental.member.entity;


import com.ftiland.travelrental.common.aduit.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Member extends BaseEntity {

    @Id // 멤버의 경우 숫자형식의 id 사용
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String displayName;

    // 이미지 필드 필요
    private Double latitude;
    private Double longitude;
    private String address;

    public Member(String email, String displayName) {
        this.email = email;
        this.displayName = displayName;
    }
}
