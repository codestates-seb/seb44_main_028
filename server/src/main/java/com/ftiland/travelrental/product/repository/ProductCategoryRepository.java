package com.ftiland.travelrental.product.repository;

import com.ftiland.travelrental.product.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, String> {
    void deleteByProductProductId(String productId);

    List<ProductCategory> findByProductProductId(String productId);
}
