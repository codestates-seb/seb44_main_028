package com.ftiland.travelrental.product.repository;

import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.product.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, String> {
    void deleteByProductProductId(String productId);

    List<ProductCategory> findByProductProductId(String productId);

    List<ProductCategory> findByCategory(Category category);
}
