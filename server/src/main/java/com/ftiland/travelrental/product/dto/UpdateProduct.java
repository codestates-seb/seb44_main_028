package com.ftiland.travelrental.product.dto;


import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class UpdateProduct {


    @Getter
    @NoArgsConstructor
    public static class Request {
        private String title;
        private Integer baseFee;
        private Integer feePerDay;
        private Integer overdueFee;
        private String content;
        private Integer minimumRentalPeriod;

        private List<String> categoryIds;

        // test를 위해 memberEmail을 받는다.
        private String memberEmail;
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