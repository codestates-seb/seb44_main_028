package com.ftiland.travelrental.product.dto;

import com.ftiland.travelrental.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {


    private String title;
    private String content;
    private Integer baseFee;
    private Integer feePerDay;
    private Integer minimumRentalPeriod;

    private String image;

    private String address;

    public static ProductDto from(Product product) {
        return ProductDto.builder()
                .title(product.getTitle())
                .content(product.getContent())
                .baseFee(product.getBaseFee())
                .feePerDay(product.getFeePerDay())
                .minimumRentalPeriod(product.getMinimumRentalPeriod())
                .address(product.getAddress())
                .image(null).build();

    }
}
