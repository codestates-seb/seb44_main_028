package com.ftiland.travelrental.product.entity;


import com.ftiland.travelrental.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ProductCategory {

    // 제가 일단 마음대로 product 패키지에 놨으니 의견 말씀해주세요.
    @Id
    private String productCategoryId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
