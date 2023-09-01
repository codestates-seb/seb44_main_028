package com.ftiland.travelrental.image.service;

import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.image.repository.ImageProductRepository;
import com.ftiland.travelrental.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageProductService {

    private final ImageProductRepository imageProductRepository;

    public List<String> findImageFileName(String productId) {
        List<ImageProduct> images = imageProductRepository.findByProductProductId(productId);
        imageProductRepository.deleteAll(images);
        return images.stream()
                .map(i -> i.getFileName())
                .collect(Collectors.toList());
    }

    @Transactional
    public void createImageProducts(Product product, List<ImageDto> imageDtos) {
        List<ImageProduct> images = imageDtos.stream()
                .map(i -> new ImageProduct(
                        UUID.randomUUID().toString(),
                        i.getFileName(),
                        i.getImageUrl(),
                        i.getFileType(),
                        product
                ))
                .collect(Collectors.toList());

        imageProductRepository.saveAll(images);
    }

    // 상품 이미지
    @Transactional
    public List<String> findImageProducts(String productId) {
        return imageProductRepository.findImageUrlByProductId(productId);
    }
}
