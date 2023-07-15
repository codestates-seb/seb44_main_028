package com.ftiland.travelrental.product.helper;

import com.ftiland.travelrental.product.dto.FeaturedProductsResponseDto;
import com.ftiland.travelrental.product.dto.ProductDto;
import com.ftiland.travelrental.product.entity.Product;

import java.util.List;
import java.util.stream.Collectors;

public class FeaturedProductsHelper {
    public static FeaturedProductsResponseDto createFeaturedProductsResponseDto(List<Product> top3ByViewCount, List<Product> top3ByTotalRateScoreRatio, List<Product> top3ByBaseFeeZero) {
        FeaturedProductsResponseDto responseDTO = new FeaturedProductsResponseDto();
        responseDTO.setTop3ByViewCount(mapToProductDtoList(top3ByViewCount));
        responseDTO.setTop3ByTotalRateScoreRatio(mapToProductDtoList(top3ByTotalRateScoreRatio));
        responseDTO.setTop3ByBaseFeeZero(mapToProductDtoList(top3ByBaseFeeZero));
        return responseDTO;
    }

    private static List<ProductDto> mapToProductDtoList(List<Product> products) {
        return products.stream()
                .map(ProductDto::from)
                .collect(Collectors.toList());
    }
}
