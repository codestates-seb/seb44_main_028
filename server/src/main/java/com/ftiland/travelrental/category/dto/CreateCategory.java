package com.ftiland.travelrental.category.dto;

import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.image.entity.ImageCategory;
import com.ftiland.travelrental.product.dto.CreateProduct;
import com.ftiland.travelrental.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

public class CreateCategory {


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        private String categoryId;
        private String title;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private String categoryId;
        private ImageCategory image;

        public static Response from(Category category) {
            return Response.builder()
                    .categoryId(category.getCategoryId())
                    .image(category.getImage())
                    .build();
        }
    }
}
