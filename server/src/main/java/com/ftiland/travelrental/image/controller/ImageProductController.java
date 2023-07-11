package com.ftiland.travelrental.image.controller;

import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.mapper.ImageMapper;
import com.ftiland.travelrental.image.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;


@RestController
@RequestMapping("/api/products/images")
public class ImageProductController {
    private ImageService imageService;
    private ImageMapper imageMapper;

    @Autowired
    public void imageController(ImageService imageService, ImageMapper imageMapper) {
        this.imageService = imageService;
        this.imageMapper = imageMapper;
    }

    // 사진 등록 ( 상품 , Post)
    @PostMapping
    public ResponseEntity postImageProduct(@RequestParam("imageFile") MultipartFile imageFile, @RequestParam("productId") String productId) {
        ImageProduct imageProduct = imageService.storeImageProduct(imageFile, productId);
        ImageDto.ResponseForProduct response = imageMapper.imageProductToResponse(imageProduct);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    // 사진 삭제 ( 상품 , Delete)
    @DeleteMapping
    public HttpStatus deleteImage(@RequestParam("imageId") String imageId) {
        imageService.deleteImageProduct(imageId);

        return HttpStatus.OK;
    }


    // 사진 조회 ( 상품 , Get )
    @GetMapping
    public ResponseEntity getImageProduct(@RequestParam("productId") String productId) {
        ArrayList<ImageProduct> images = imageService.findImageProduct(productId);
        ImageDto.ResponseList responses = imageMapper.imagesToResponseList(images);

        return new ResponseEntity(responses, HttpStatus.OK);
    }


}