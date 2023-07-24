package com.ftiland.travelrental.product.service;

import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.category.dto.CategoryDtoForProductDetail;
import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.category.repository.CategoryRepository;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.common.utils.GeoUtils;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.image.repository.ImageProductRepository;
import com.ftiland.travelrental.image.service.ImageProductService;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.member.service.MemberService;

import com.ftiland.travelrental.member.entity.Member;

import com.ftiland.travelrental.product.dto.*;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.entity.ProductCategory;
import com.ftiland.travelrental.product.repository.ProductCategoryRepository;
import com.ftiland.travelrental.product.repository.ProductRepository;
import com.ftiland.travelrental.product.sort.SortBy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
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
    private final ImageService imageService;
    private final ImageProductService imageProductService;

    @Transactional
    public CreateProduct.Response createProduct(CreateProduct.Request request, Long memberId, List<ImageDto> images) {
        log.info("[ProductService] createProduct called");
        Member member = memberService.findMember(memberId);

        validateLocation(member);

        /*Random random = new Random();
        int totalRateCount = random.nextInt(100) + 1;*/

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
                /*.totalRateCount(totalRateCount)
                .totalRateScore(totalRateCount * (random.nextInt(5)+1))
                .viewCount(random.nextInt(1000))*/
                .latitude(member.getLatitude())
                .longitude(member.getLongitude())
                .address(member.getAddress())
                .mainImage(images.get(0).getImageUrl())
                .member(member).build();

        // save시에 id를 기준으로 insert쿼리나 update쿼리를 생성해야하기 때문에 select를 먼저 실행한다.
        Product product = productRepository.save(productEntity);

        List<CategoryDto> productCategories =
                productCategoryService.createProductCategories(product, request.getCategoryIds());

        imageProductService.createImageProducts(product, images);

        return CreateProduct.Response.from(product, productCategories);
    }

    private static void validateLocation(Member member) {
        if (member.getLatitude() == null || member.getLongitude() == null) {
            throw new BusinessLogicException(NOT_FOUND_LOCATION);
        }
    }

    private void validateOwner(Member member, Product product) {
        if (!member.getMemberId().equals(product.getMember().getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);
        }
    }

    @Transactional
    //@CacheEvict(key = "#productId", value = "products")
    public UpdateProduct.Response updateProduct(UpdateProduct.Request request,
                                                String productId,
                                                Long memberId,
                                                List<ImageDto> images) {
        Member member = memberService.findMember(memberId);

        Product product = findProduct(productId);

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

        List<String> imageFileNames = imageProductService.findImageFileName(productId);

        imageProductService.createImageProducts(product, images);

        return UpdateProduct.Response.from(product, imageFileNames);
    }

    @Transactional
    @CacheEvict(key = "#productId", value = "products")
    public void deleteProduct(String productId, Long memberId) {
        Member member = memberService.findMember(memberId);

        Product product = findProduct(productId);

        validateOwner(member, product);

        productRepository.delete(product);
    }

    public Product findProduct(String productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new BusinessLogicException(PRODUCT_NOT_FOUND));
    }

    //@Cacheable(key = "#productId", value = "products")
    public ProductDetailDto findProductDetail(String productId) {
        log.info("[ProductService] findProductDetail called");
        Product product = findProduct(productId);

        List<CategoryDtoForProductDetail> categories = productCategoryService.findCategoriesByProductId(productId);

        List<String> images = imageService.findImageProducts(productId);

        return ProductDetailDto.from(product, categories, images);
    }

    public GetProducts findProducts(Long memberId, int size, int page) {
        Member member = memberService.findMember(memberId);

        Page<ProductDto> products = productRepository.findProductDtosByMemberId(memberId, PageRequest.of(page, size));

        return GetProducts.from(products);
    }

    @Transactional
    public void updateView(String productId) {
        Product product = findProduct(productId);
        product.setViewCount(product.getViewCount() + 1);
    }

    public List<Product> findProductByMemberId(Long memberId) {
        return productRepository.findAllByMemberMemberId(memberId);
    }

    public List<Product> getTop3ByViewCount() {
        return productRepository.findTop3ByOrderByViewCountDesc();
    }

    public List<Product> getTop3ByTotalRateScoreRatio() {
        //첫번째 페이지에서 3개의 product만 가져오도록
        int PAGE = 0;
        int SIZE = 3;

        return productRepository.findTop3ByOrderByTotalRateScoreRatioDesc(PageRequest.of(PAGE, SIZE));
    }

    public List<Product> getTop3ByBaseFeeZero(int baseFee) {
        return productRepository.findTop3ByBaseFeeOrderByCreatedAtDesc(0);
    }

    public GetProducts searchProductsByKeyword(String keyword, Pageable pageable) {
        Page<Product> products = productRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);

        Page<ProductDto> productDtos= products.map(product -> ProductDto.from(product));

        return GetProducts.from(productDtos);
    }

    public Long findSellerId(String productId) {
        Product product = productRepository.findById(productId).orElseThrow(() -> new BusinessLogicException(PRODUCT_NOT_FOUND));
        Long sellerId = product.getMember().getMemberId();

        return sellerId;
    }

    public GetProducts getProductsByCategoryAndLocation(String categoryId, Long memberId,
                                                        Double distance, SortBy sortBy, int size, int page) {

        PageRequest pageable = PageRequest.of(page, size);
        // distance 없을 때
        if (distance == null) {
            // 가까운 순 정렬일 때
            if (sortBy == SortBy.distance) {
                // 로그인한 사용자인지 검증
                if (memberId == null) {
                    throw new BusinessLogicException(MEMBER_NOT_FOUND);
                }

                Member member = memberService.findMember(memberId);

                // member가 위치를 가지고 있는지 검증
                validateLocation(member);

                Page<ProductDto> products = productRepository
                        .findByCategoryIdOrderByDistance(categoryId, member.getLatitude(), member.getLongitude(), pageable);
                return GetProducts.from(products);
            } else if (sortBy == SortBy.totalRateScore) {
                return GetProducts.from(productRepository.findByCategoryIdOrderByRate(categoryId, pageable));
            } else {
                pageable = PageRequest.of(page, size, Sort.by("p." + sortBy.toString()).descending());
                return GetProducts.from(productRepository.findByCategoryId(categoryId, pageable));
            }
        }
        // distance가 있을 때
        else {
            if (memberId == null) {
                throw new BusinessLogicException(MEMBER_NOT_FOUND);
            }
            Member member = memberService.findMember(memberId);
            Double bound = distance/100;

            // 가까운 순 정렬일 때
            if (sortBy == SortBy.distance) {

                // member가 위치를 가지고 있는지 검증
                validateLocation(member);
                Page<ProductDto> products = productRepository.findByCategoryIdOrderByDistanceLimitBound(
                        categoryId, member.getLatitude(), member.getLongitude(), pageable, bound);
                return GetProducts.from(products);
            } else if (sortBy == SortBy.totalRateScore) {
                return GetProducts.from(productRepository
                        .findByCategoryIdOrderByRateLimitBound(categoryId, member.getLatitude(), member.getLongitude(), pageable, bound));
            } else {
                pageable = PageRequest.of(page, size, Sort.by("p." + sortBy.toString()).descending());
                return GetProducts.from(productRepository.findByCategoryIdLimitBound(categoryId, member.getLatitude(), member.getLongitude(), pageable, bound));
            }
        }
    }

    public FeaturedProductsResponseDto findMainPage() {
        List<Product> top3ByTotalRateScoreRatio = getTop3ByTotalRateScoreRatio();
        List<ProductDto> top3ByTotalRateScoreRatioDtoList = convertToProductDtoList(top3ByTotalRateScoreRatio);

        List<Product> top3ByViewCount = getTop3ByViewCount();
        List<ProductDto> top3ByViewCountDtoList = convertToProductDtoList(top3ByViewCount);

        List<Product> top3ByBaseFeeZero = getTop3ByBaseFeeZero(0);
        List<ProductDto> top3ByBaseFeeZeroDtoList = convertToProductDtoList(top3ByBaseFeeZero);

        FeaturedProductsResponseDto responseDto = new FeaturedProductsResponseDto();
        responseDto.setTop3ByTotalRateScoreRatio(top3ByTotalRateScoreRatioDtoList);
        responseDto.setTop3ByViewCount(top3ByViewCountDtoList);
        responseDto.setTop3ByBaseFeeZero(top3ByBaseFeeZeroDtoList);

        return responseDto;
    }

    private List<ProductDto> convertToProductDtoList(List<Product> products) {
        return products.stream()
                .map(product -> ProductDto.from(product))
                .collect(Collectors.toList());
    }
}