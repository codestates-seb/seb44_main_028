package com.ftiland.travelrental.product.repository;

import com.ftiland.travelrental.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByMemberMemberId(Long memberId);
}
