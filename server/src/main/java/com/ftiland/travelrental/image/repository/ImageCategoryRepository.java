package com.ftiland.travelrental.image.repository;

import com.ftiland.travelrental.image.entity.ImageCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageCategoryRepository extends JpaRepository<ImageCategory, String> {
}