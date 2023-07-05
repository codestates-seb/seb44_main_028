package com.ftiland.travelrental.category.repository;


import com.ftiland.travelrental.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {

    List<Category> findAllByCategoryIdIn(List<String> categoryIds);
}
