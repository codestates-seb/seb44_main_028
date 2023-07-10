package com.ftiland.travelrental.product.controller;

import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.product.dto.CreateProduct;
import com.ftiland.travelrental.product.dto.ProductDetailDto;
import com.ftiland.travelrental.product.dto.ProductDto;
import com.ftiland.travelrental.product.dto.UpdateProduct;
import com.ftiland.travelrental.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<CreateProduct.Response> createProduct(
            @Valid @RequestPart(required = false) CreateProduct.Request request,
            @RequestPart(required = false) List<MultipartFile> images) {
        log.info("[ProductController] createProduct called");
        Long memberId = 1L;

        CreateProduct.Response response = productService.createProduct(request, memberId);

        Optional.ofNullable(images)
                .ifPresent(i -> imageService.storeImageProducts(i, response.getProductId()));

        URI uri = URI.create(String.format("/api/products/%s", response.getProductId()));
        return ResponseEntity.created(uri).body(response);
    }

    @PatchMapping("/{product-id}")
    public ResponseEntity<UpdateProduct.Response> updateProduct(@PathVariable("product-id") String productId,
                                                                @Valid @RequestBody UpdateProduct.Request request) {
        log.info("[ProductController] updateProduct called");
        Long memberId = 1L;

        return ResponseEntity.ok(productService.updateProduct(request, productId, memberId));
    }

    @DeleteMapping("/{product-id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("product-id") String productId) {
        log.info("[ProductController] deleteProduct called");
        Long memberId = 1L;
        productService.deleteProduct(productId, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{product-id}")
    public ResponseEntity<ProductDetailDto> findProductDetail(@PathVariable("product-id") String productId) {
        log.info("[ProductController] findProductDetail called");
        Long memberId = 1L;
        return ResponseEntity.ok(productService.findProductDetail(productId));
    }

    @GetMapping("/members")
    public ResponseEntity<List<ProductDto>> findProducts() {
        log.info("[ProductController] findProducts called");
        Long memberId = 2L;
        return ResponseEntity.ok(productService.findProducts(memberId));
    }
}
