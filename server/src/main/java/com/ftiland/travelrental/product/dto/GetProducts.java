package com.ftiland.travelrental.product.dto;

import com.ftiland.travelrental.common.PageInfo;
import com.ftiland.travelrental.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetProducts {

    private List<ProductDto> products;
    private PageInfo pageInfo;


    public static GetProducts from(List<ProductDto> products, PageInfo pageInfo) {
        return GetProducts.builder()
                .products(products)
                .pageInfo(pageInfo).build();
    }
}
