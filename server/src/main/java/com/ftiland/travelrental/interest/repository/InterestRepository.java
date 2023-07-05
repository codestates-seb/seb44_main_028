package com.ftiland.travelrental.interest.repository;

import com.ftiland.travelrental.interest.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InterestRepository extends JpaRepository<Interest,String> {

    // 유저의 찜한 특정상품 검색
    @Query("SELECT i FROM Interest i WHERE i.member.memberId = :memberId AND i.product.productId = :productId")
    Optional<Interest> findByProductIdMemberId(@Param("memberId")long memberId,@Param("productId")String productId);

    // 한 유저의 관심 목록
    @Query("SELECT i FROM Interest i WHERE i.member.memberId = :memberId")
    List<Interest> findByMemberId(@Param("memberId")long memberId);
}
