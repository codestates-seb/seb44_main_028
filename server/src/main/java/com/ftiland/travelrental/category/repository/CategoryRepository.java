package com.ftiland.travelrental.category.repository;


import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.product.entity.ProductCategory;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    @EntityGraph(attributePaths = "image")
    List<Category> findAll();

    List<Category> findAllByCategoryIdIn(List<String> categoryIds);

}
