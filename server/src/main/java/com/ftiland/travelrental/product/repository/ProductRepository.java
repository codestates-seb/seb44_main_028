package com.ftiland.travelrental.product.repository;

import com.ftiland.travelrental.product.dto.ProductDto;
import com.ftiland.travelrental.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Page<Product> findByMemberMemberId(Long memberId, Pageable pageable);

    List<Product> findAllByMemberMemberId(Long memberId);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, p.mainImage, p.address) " +
            "FROM ProductCategory pc " +
            "JOIN pc.product p " +
            "WHERE pc.category.categoryId = :categoryId")
    Page<ProductDto> findByCategoryId(@Param("categoryId") String categoryId, Pageable pageable);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, p.mainImage, p.address) " +
            "FROM ProductCategory pc " +
            "JOIN pc.product p " +
            "WHERE pc.category.categoryId = :categoryId " +
            "ORDER BY p.totalRateScore / p.totalRateCount DESC")
    Page<ProductDto> findByCategoryIdOrderByRate(@Param("categoryId") String categoryId, Pageable pageable);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, p.mainImage, p.address) " +
            "FROM ProductCategory pc " +
            "JOIN pc.product p " +
            "WHERE pc.category.categoryId = :categoryId " +
            "ORDER BY SQRT(POW(:lat - p.latitude, 2) + POW(:lng - p.longitude, 2)) ASC")
    Page<ProductDto> findByCategoryIdOrderByDistance(@Param("categoryId") String categoryId, @Param("lat") double lat,
                                                     @Param("lng") double lng, Pageable pageable);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, p.mainImage, p.address) " +
            "FROM ProductCategory pc " +
            "JOIN pc.product p " +
            "WHERE pc.category.categoryId = :categoryId and SQRT(POW(:lat - p.latitude, 2) + POW(:lng - p.longitude, 2)) < :bound " +
            "ORDER BY SQRT(POW(:lat - p.latitude, 2) + POW(:lng - p.longitude, 2)) ASC")
    Page<ProductDto> findByCategoryIdOrderByDistanceLimitBound(@Param("categoryId") String categoryId, @Param("lat") double lat,
                                                               @Param("lng") double lng, Pageable pageable, @Param("bound") Double bound);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, p.mainImage, p.address) " +
            "FROM ProductCategory pc " +
            "JOIN pc.product p " +
            "WHERE pc.category.categoryId = :categoryId and SQRT(POW(:lat - p.latitude, 2) + POW(:lng - p.longitude, 2)) < :bound ")
    Page<ProductDto> findByCategoryIdLimitBound(@Param("categoryId") String categoryId, @Param("lat") double lat,
                                                @Param("lng") double lng, Pageable pageable,
                                                @Param("bound") Double bound);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, p.mainImage, p.address) " +
            "FROM ProductCategory pc " +
            "JOIN pc.product p " +
            "WHERE pc.category.categoryId = :categoryId and SQRT(POW(:lat - p.latitude, 2) + POW(:lng - p.longitude, 2)) < :bound " +
            "ORDER BY p.totalRateScore / p.totalRateCount DESC")
    Page<ProductDto> findByCategoryIdOrderByRateLimitBound(@Param("categoryId") String categoryId, @Param("lat") double lat,
                                                           @Param("lng") double lng,
                                                           Pageable pageable, @Param("bound") Double bound);

    List<Product> findTop3ByOrderByViewCountDesc();

    @Query("SELECT p FROM Product p ORDER BY p.totalRateScore / p.totalRateCount DESC")
    List<Product> findTop3ByOrderByTotalRateScoreRatioDesc(Pageable pageable);

    List<Product> findTop3ByBaseFeeOrderByCreatedAtDesc(Integer baseFee);

    @Query("SELECT new com.ftiland.travelrental.product.dto.ProductDto(p.productId, p.title, p.content, p.baseFee, p.feePerDay, p.minimumRentalPeriod, p.mainImage, p.address) " +
            "FROM Product p " +
            "WHERE p.member.memberId = :memberId " +
            "GROUP BY p.productId")
    Page<ProductDto> findProductDtosByMemberId(@Param("memberId") Long memberId, Pageable pageable);

    Page<Product> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);


}