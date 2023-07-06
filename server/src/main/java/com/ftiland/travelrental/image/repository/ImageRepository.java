package com.ftiland.travelrental.image.repository;

import com.ftiland.travelrental.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image,String> {

    @Query("SELECT i FROM Image i WHERE i.product.productId =:productId")
    List<Image> findByProductId(@Param("productId") String productId);
}
