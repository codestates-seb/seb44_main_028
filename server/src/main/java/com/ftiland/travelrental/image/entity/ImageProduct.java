package com.ftiland.travelrental.image.entity;

import com.ftiland.travelrental.common.aduit.BaseEntity;
import com.ftiland.travelrental.product.entity.Product;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ImageProduct extends BaseEntity {
    @Id
    private String imageId;

    private String fileName;

    private String imageUrl;

    private String fileType;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;



}
