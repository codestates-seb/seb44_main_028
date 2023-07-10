package com.ftiland.travelrental.product.service;

import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;


import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.member.service.MemberService;

import com.ftiland.travelrental.member.entity.Member;

import com.ftiland.travelrental.product.dto.CreateProduct;
import com.ftiland.travelrental.product.dto.ProductDetailDto;
import com.ftiland.travelrental.product.dto.ProductDto;
import com.ftiland.travelrental.product.dto.UpdateProduct;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ftiland.travelrental.common.exception.ExceptionCode.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final MemberService memberService;
    private final ProductCategoryService productCategoryService;

    @Transactional
    public CreateProduct.Response createProduct(CreateProduct.Request request, Long memberId) {
        log.info("[ProductService] createProduct called");
        Member member = memberService.findMember(memberId);

        if (member.getLatitude() == null || member.getLongitude() == null) {
            throw new BusinessLogicException(NOT_FOUND_LOCATION);
        }

        Product productEntity = Product.builder()
                .productId(UUID.randomUUID().toString())
                .title(request.getTitle())
                .content(request.getContent())
                .overdueFee(request.getOverdueFee())
                .baseFee(request.getBaseFee())
                .feePerDay(request.getFeePerDay())
                .minimumRentalPeriod(request.getMinimumRentalPeriod())
                .totalRateCount(0)
                .totalRateScore(0)
                .viewCount(0)
                .latitude(member.getLatitude())
                .longitude(member.getLongitude())
                .address(member.getAddress())
                .member(member).build();

        // save시에 id를 기준으로 insert쿼리나 update쿼리를 생성해야하기 때문에 select를 먼저 실행한다.
        Product product = productRepository.save(productEntity);

        List<CategoryDto> productCategories =
                productCategoryService.createProductCategories(product, request.getCategoryIds());

        // 이미지 저장

        return CreateProduct.Response.from(product, productCategories);
    }

    private void validateOwner(Member member, Product product) {
        if (!member.getMemberId().equals(product.getMember().getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }
    }

    @Transactional
    public UpdateProduct.Response updateProduct(UpdateProduct.Request request,
                                                String productId, Long memberId) {
        Member member = memberService.findMember(memberId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(PRODUCT_NOT_FOUND));

        validateOwner(member, product);

        Optional.ofNullable(request.getBaseFee())
                .ifPresent(baseFee -> product.setBaseFee(baseFee));
        Optional.ofNullable(request.getTitle())
                .ifPresent(title -> product.setTitle(title));
        Optional.ofNullable(request.getContent())
                .ifPresent(content -> product.setContent(content));
        Optional.ofNullable(request.getFeePerDay())
                .ifPresent(feePerDay -> product.setFeePerDay(feePerDay));
        Optional.ofNullable(request.getOverdueFee())
                .ifPresent(overdueFee -> product.setOverdueFee(overdueFee));
        Optional.ofNullable(request.getMinimumRentalPeriod())
                .ifPresent(minimumRentalPeriod -> product.setMinimumRentalPeriod(minimumRentalPeriod));
        Optional.ofNullable(request.getCategoryIds())
                .ifPresent(categoryIds -> {
                    productCategoryService.deleteProductCategoriesByProductId(productId);
                    productCategoryService.createProductCategories(product, categoryIds);
                });

        return UpdateProduct.Response.from(product);
    }

    @Transactional
    public void deleteProduct(String productId, Long memberId) {
        Member member = memberService.findMember(memberId);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(PRODUCT_NOT_FOUND));

        validateOwner(member, product);

        productRepository.delete(product);
    }

    public Product findProduct(String productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(PRODUCT_NOT_FOUND));
    }

    public ProductDetailDto findProductDetail(String productId) {
        Product product = findProduct(productId);

        List<CategoryDto> categories = productCategoryService.findCategoriesByProductId(productId);
        return ProductDetailDto.from(product, categories);
    }

    public List<ProductDto> findProducts(Long memberId) {
        Member member = memberService.findMember(memberId);

        List<Product> products = productRepository.findByMemberMemberId(memberId);

        return products.stream()
                .map(ProductDto::from)
                .collect(Collectors.toList());
    }
}