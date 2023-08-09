package com.ftiland.travelrental.product.controller;

import com.ftiland.travelrental.common.annotation.CurrentMember;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.product.dto.*;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.service.ProductCategoryService;
import com.ftiland.travelrental.product.service.ProductService;
import com.ftiland.travelrental.product.sort.SortBy;
import com.ftiland.travelrental.reservation.dto.GetBorrowReservations;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<?> createProduct(@Valid @RequestPart CreateProduct.Request request,
                                           @RequestPart List<MultipartFile> images,
                                           @CurrentMember Long memberId) {

        List<ImageDto> imageDtos = imageService.storeImages(images);
        CreateProduct.Response response = productService.createProduct(request, memberId, imageDtos);

        URI uri = URI.create(String.format("/api/products/%s", response.getProductId()));
        return ResponseEntity.created(uri).body(response);
    }

    @PatchMapping("/{product-id}")
    public ResponseEntity<?> updateProduct(@PathVariable("product-id") String productId,
                                           @Valid @RequestPart UpdateProduct.Request request,
                                           @RequestPart List<MultipartFile> images,
                                           @CurrentMember Long memberId) {
        // 이미지 저장
        List<ImageDto> imageDtos = imageService.storeImages(images);
        UpdateProduct.Response response = productService.updateProduct(request, productId, memberId, imageDtos);

        // 이전 이미지 삭제
        imageService.deleteImages(response.getDeletedImageName());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{product-id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("product-id") String productId,
                                           @CurrentMember Long memberId) {

        productService.deleteProduct(productId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{product-id}")
    public ResponseEntity<?> findProductDetail(@PathVariable("product-id") String productId,
                                               HttpServletRequest request,
                                               HttpServletResponse response) {

        ProductDetailDto productDetail = productService.findProductDetail(productId);
        // 조회수 로직
        countView(productId, request, response);
        return ResponseEntity.ok(productDetail);
    }

    @GetMapping("/members")
    public ResponseEntity<?> findProducts(@RequestParam(defaultValue = "20") int size,
                                          @RequestParam(defaultValue = "0") int page,
                                          @CurrentMember Long memberId) {

        return ResponseEntity.ok(productService.findProductsByMember(memberId, size, page));
    }

    @GetMapping("/featured")
    public ResponseEntity<FeaturedProductsResponseDto> findFeaturedProducts() {

        FeaturedProductsResponseDto responseDto = productService.findMainPage();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProductsByKeyword(@RequestParam("keyword") String keyword,
                                                     @RequestParam("size") int size,
                                                     @RequestParam("page") int page) {
        Pageable pageable = PageRequest.of(page, size);
        GetProducts responseDto = productService.searchProductsByKeyword(keyword, pageable);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getProductsByCategoryAndLocation(@CurrentMember(required = false) Long memberId,
                                                              @RequestParam String categoryId,
                                                              @RequestParam(required = false) Double distance,
                                                              @RequestParam SortBy sortBy,
                                                              @RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size) {
        GetProducts responseDto = productService
                .getProductsByCategoryAndLocation(categoryId, memberId, distance, sortBy, size, page);

        return new ResponseEntity(responseDto, HttpStatus.OK);
    }

    private void countView(String productId, HttpServletRequest request, HttpServletResponse response) {
        /* 조회수 로직 */
        Cookie oldCookie = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("postView")) {
                    oldCookie = cookie;
                }
            }
        }

        if (oldCookie != null) {
            if (!oldCookie.getValue().contains("[" + productId + "]")) {
                productService.updateView(productId);
                oldCookie.setValue(oldCookie.getValue() + "_[" + productId + "]");
                oldCookie.setPath("/");
                oldCookie.setMaxAge(60 * 60 * 24);
                response.addCookie(oldCookie);
            }
        } else {
            productService.updateView(productId);
            Cookie newCookie = new Cookie("postView", "[" + productId + "]");
            newCookie.setPath("/");
            newCookie.setMaxAge(60 * 60 * 24);
            response.addCookie(newCookie);
        }
    }
}