package com.ftiland.travelrental.category.dto;

import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.product.entity.ProductCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    private String categoryId;
    private String title;
    private String image;

    public static CategoryDto from(Category category) {
        return CategoryDto.builder()
                .categoryId(category.getCategoryId())
                .image(category.getImage().getImageUrl())
                .title(category.getTitle()).build();
    }
}
