package com.ftiland.travelrental.category.dto;

import com.ftiland.travelrental.category.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDtoForProductDetail {
    private String categoryId;
    private String title;

    public static CategoryDtoForProductDetail from(Category category) {
        return CategoryDtoForProductDetail.builder()
                .categoryId(category.getCategoryId())
                .title(category.getTitle()).build();
    }
}
