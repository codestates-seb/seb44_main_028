package com.ftiland.travelrental.image.repository;

import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface ImageProductRepository extends JpaRepository<ImageProduct,String> {

    @Query("SELECT i.imageUrl FROM ImageProduct i " +
            "WHERE i.product.productId =:productId ORDER BY i.createdAt asc ")
    List<String> findImageUrlByProductId(@Param("productId") String productId);

    List<ImageProduct> findByProductProductId(String productId);

    Optional<ImageProduct> findFirstByProductProductId(String productId);

    List<ImageProduct> findByProductProductIdOrderByCreatedAtAsc(String productId);

    ImageProduct findFirstByProductProductIdOrderByCreatedAtAsc(String productId);

    ImageProduct findFirstByProductOrderByCreatedAtAsc(Product product);
}
