package com.ftiland.travelrental.product.service;

import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.category.repository.CategoryRepository;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.entity.ProductCategory;
import com.ftiland.travelrental.product.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ftiland.travelrental.common.exception.ExceptionCode.CATEGORY_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;
    private final CategoryRepository categoryRepository;

    public List<CategoryDto> findCategoriesByProductId(String productId) {
        List<ProductCategory> productCategories = productCategoryRepository.findByProductProductId(productId);

        return productCategories.stream()
                .map(p -> CategoryDto.from(p.getCategory()))
                .collect(Collectors.toList());
    }

    public List<CategoryDto> createProductCategories(Product product, List<String> categoryIds) {
        List<Category> categories = categoryRepository.findAllByCategoryIdIn(categoryIds);

        // 3개의 categoryId가 들어왔는데 2개만 조회된다면 잘못된 Id가 들어온 것이기 때문에 예외발생
        if (categories.size() != categoryIds.size()) {
            throw new BusinessLogicException(CATEGORY_NOT_FOUND);
        }

        List<ProductCategory> productCategories = categories.stream()
                .map(category -> ProductCategory.builder()
                        .productCategoryId(UUID.randomUUID().toString())
                        .category(category)
                        .product(product).build())
                .collect(Collectors.toList());

        // saveAll할 때 여러개의 리스트를 한번에 select하고 한번에 insert하기를 바랬는데 안됨
        // 배치 삽입?
        productCategoryRepository.saveAll(productCategories);


        // 이 과정이 좋은 과정인가? 카테고리를 꺼내는 쿼리문이 계속 나가게 된다 title을 꺼내기 위한 이유로
        return productCategories.stream()
                .map(p -> CategoryDto.from(p.getCategory()))
                .collect(Collectors.toList());
    }

    public void deleteProductCategoriesByProductId(String productId) {
        productCategoryRepository.deleteByProductProductId(productId);
    }
}
