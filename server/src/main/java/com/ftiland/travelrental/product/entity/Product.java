package com.ftiland.travelrental.product.entity;


import com.ftiland.travelrental.common.aduit.BaseEntity;
import com.ftiland.travelrental.image.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product extends BaseEntity {

    @Id
    private String productId;
    private String title;
    private String content;

    // 이미지 필드 필요

    private Integer baseFee;
    private Integer feePerDay;
    private Integer overdueFee;
    private Integer minimumRentalPeriod;

    private Double totalRateScore;
    private Double totalRateCount;

    private Integer viewCount;

    @OneToMany(mappedBy = "product")
    private List<Image> images;
}
