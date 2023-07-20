package com.ftiland.travelrental.image.mapper;

import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.category.repository.CategoryRepository;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageCategory;
import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.repository.ProductRepository;
import com.ftiland.travelrental.product.service.ProductService;
import org.mapstruct.Mapper;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.ArrayList;
import java.util.Objects;
import java.util.UUID;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    default ImageProduct fileToImageProduct(MultipartFile multipartFile, ProductService productService, String productId) {
        ImageProduct imageProduct = new ImageProduct();
        imageProduct.setImageId(UUID.randomUUID().toString());
        imageProduct.setFileType(multipartFile.getContentType());

        // service 구현 필요
        //Product product = productRepository.findById(productId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
        Product product = productService.findProduct(productId);
        imageProduct.setProduct(product);
        return imageProduct;
    }

    default ImageCategory fileToImageCategory(MultipartFile multipartFile, CategoryRepository categoryRepository, String categoryId) {
        ImageCategory imageCategory = new ImageCategory();
        imageCategory.setImageId(UUID.randomUUID().toString());
        imageCategory.setFileType(multipartFile.getContentType());

        return imageCategory;
    }


    default ImageMember fileToImageMember(MultipartFile multipartFile, MemberRepository memberRepository, Long memberId) {
        ImageMember imageMember = new ImageMember();
        imageMember.setImageId(UUID.randomUUID().toString());
        imageMember.setFileType(multipartFile.getContentType());

        // service 구현 필요
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
        //Member member =  memberService.findMember(memberId);
        imageMember.setMember(member);

        return imageMember;
    }

    default ImageDto.ResponseForProduct imageProductToResponse(ImageProduct imageProduct) {
        ImageDto.ResponseForProduct response = new ImageDto.ResponseForProduct();
        response.setProductId(imageProduct.getProduct().getProductId());
        response.setImageUrl(imageProduct.getImageUrl());
        response.setFileName(imageProduct.getFileName());
        response.setFileType(imageProduct.getFileType());
        response.setImageId(imageProduct.getImageId());

        return response;
    }

    default ImageDto.ResponseForMember imageMemberToResponse(ImageMember imageMember) {
        ImageDto.ResponseForMember response = new ImageDto.ResponseForMember();
        response.setMemberId(imageMember.getMember().getMemberId());
        response.setImageUrl(imageMember.getImageUrl());
        response.setFileName(imageMember.getFileName());
        response.setFileType(imageMember.getFileType());
        response.setImageId(imageMember.getImageId());

        return response;
    }

    default ImageDto.ResponseList imagesToResponseList(ArrayList<ImageProduct> images) {
        ImageDto.ResponseList responses = new ImageDto.ResponseList();
        for (ImageProduct image : images) {
            ImageDto.ResponseForProduct response = imageProductToResponse(image);
            responses.addResponse(response);
        }

        return responses;
    }
}
