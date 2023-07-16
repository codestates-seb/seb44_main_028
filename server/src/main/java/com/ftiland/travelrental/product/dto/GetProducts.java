package com.ftiland.travelrental.product.dto;

import com.ftiland.travelrental.common.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetProducts {

    private List<ProductDto> products;
    private PageInfo pageInfo;


    public static GetProducts from(Page<ProductDto> products) {
        PageInfo pageInfo = new PageInfo(products.getNumber(), products.getSize(),
                products.getTotalElements(), products.getTotalPages());

        return GetProducts.builder()
                .products(products.getContent())
                .pageInfo(pageInfo).build();
    }
}
