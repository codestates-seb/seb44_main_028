package com.ftiland.travelrental.product.repository;

import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.product.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, String> {
    void deleteByProductProductId(String productId);

    @EntityGraph(attributePaths = {"category"})
    @Query("SELECT pc from ProductCategory pc where pc.product.productId = :productId")
    List<ProductCategory> findByProductId(@Param("productId") String productId);

    List<ProductCategory> findByCategory(Category category);

    List<ProductCategory> findByCategoryCategoryId(String categoryId);
}