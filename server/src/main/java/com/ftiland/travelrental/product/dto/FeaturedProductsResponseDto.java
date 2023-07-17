package com.ftiland.travelrental.product.dto;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class FeaturedProductsResponseDto {
    private List<ProductDto> top3ByViewCount;
    private List<ProductDto> top3ByTotalRateScoreRatio;
    private List<ProductDto> top3ByBaseFeeZero;
}
