package com.ftiland.travelrental.image.entity;

import com.ftiland.travelrental.common.aduit.BaseEntity;
import com.ftiland.travelrental.product.entity.Product;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Image extends BaseEntity {
    @Id
    private String imageId;
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
