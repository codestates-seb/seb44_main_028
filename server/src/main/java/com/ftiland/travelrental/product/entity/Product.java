package com.ftiland.travelrental.product.entity;


import com.ftiland.travelrental.common.aduit.BaseEntity;
import com.ftiland.travelrental.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Product extends BaseEntity {
    @Id
    private String productId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer baseFee;
    @Column(nullable = false)
    private Integer feePerDay;
    @Column(nullable = false)
    private Integer overdueFee;
    @Column(nullable = false)
    private Integer minimumRentalPeriod;

    @Column(nullable = false)
    private Integer totalRateScore;
    @Column(nullable = false)
    private Integer totalRateCount;
    @Column(nullable = false)
    private Integer viewCount;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String mainImage;

    @Column(nullable = false)
    private Double latitude;
    @Column(nullable = false)
    private Double longitude;
    @Column(nullable = false)
    private String address;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

}
