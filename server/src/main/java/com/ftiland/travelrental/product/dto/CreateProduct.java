package com.ftiland.travelrental.product.dto;


import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

public class CreateProduct {


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        @NotNull
        private String title;
        @NotNull
        private Integer baseFee;
        @NotNull
        private Integer feePerDay;
        @NotNull
        private Integer overdueFee;
        @NotNull
        private String content;
        @NotNull
        private Integer minimumRentalPeriod;

        @NotNull
        private List<String> categoryIds;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private String productId;
        private List<CategoryDto> categories;

        public static Response from(Product product, List<CategoryDto> categories) {
            return Response.builder()
                    .productId(product.getProductId())
                    .categories(categories)
                    .build();
        }
    }
}
