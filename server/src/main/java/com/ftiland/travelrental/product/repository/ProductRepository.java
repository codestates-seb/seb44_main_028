package com.ftiland.travelrental.product.repository;

import com.ftiland.travelrental.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Page<Product> findByMemberMemberId(Long memberId, Pageable pageable);

    List<Product> findTop3ByOrderByViewCountDesc();

    @Query("SELECT p FROM Product p ORDER BY p.totalRateScore / p.totalRateCount DESC")
    List<Product> findTop3ByOrderByTotalRateScoreRatioDesc(Pageable pageable);

    List<Product> findTop3ByBaseFeeOrderByCreatedAtDesc(Integer baseFee);
}
