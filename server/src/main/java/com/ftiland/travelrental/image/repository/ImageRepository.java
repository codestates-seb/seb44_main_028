package com.ftiland.travelrental.image.repository;

import com.ftiland.travelrental.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long> {
}
