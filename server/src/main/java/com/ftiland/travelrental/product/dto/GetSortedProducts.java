package com.ftiland.travelrental.product.dto;


import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.sort.SortBy;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

public class GetSortedProducts {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        @NotNull
        private String categoryId;
        private Integer distance;
        @NotNull
        private SortBy sortBy;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private String productId;
        private List<CategoryDto> categories;

        public static CreateProduct.Response from(Product product, List<CategoryDto> categories) {
            return CreateProduct.Response.builder()
                    .productId(product.getProductId())
                    .categories(categories)
                    .build();
        }
    }
}
