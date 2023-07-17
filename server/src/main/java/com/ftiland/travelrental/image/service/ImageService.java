package com.ftiland.travelrental.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ftiland.travelrental.category.repository.CategoryRepository;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.entity.ImageCategory;
import com.ftiland.travelrental.image.repository.ImageCategoryRepository;
import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.mapper.ImageMapper;
import com.ftiland.travelrental.image.repository.ImageMemberRepository;

import com.ftiland.travelrental.image.repository.ImageProductRepository;
import com.ftiland.travelrental.member.repository.MemberRepository;
import com.ftiland.travelrental.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ImageService {

    private ImageMapper imageMapper;

    @Value("${cloud.aws.s3.bucket}")
    private String buckName;

    private final AmazonS3 amazonS3;

    private ImageProductRepository imageProductRepository;
    private ImageMemberRepository imageMemberRepository;
    private ProductRepository productRepository;
    private MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final ImageCategoryRepository imageCategoryRepository;

    @Autowired
    public ImageService(AmazonS3 amazonS3, ImageMapper imageMapper, ImageProductRepository imageProductRepository,
                        ImageMemberRepository imageMemberRepository, MemberRepository memberRepository,
                        ProductRepository productRepository,
                        CategoryRepository categoryRepository,
                        ImageCategoryRepository imageCategoryRepository) {
        this.amazonS3 = amazonS3;
        this.imageMapper = imageMapper;
        this.imageProductRepository = imageProductRepository;
        this.imageMemberRepository = imageMemberRepository;
        this.productRepository = productRepository;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.imageCategoryRepository = imageCategoryRepository;
    }

    // 이미지 업로드(카테고리)
    public ImageCategory storeImageCategory(MultipartFile file, String categoryId) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, fileName, file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }
        ImageCategory imageCategory = imageMapper.fileToImageCategory(file, categoryRepository, categoryId);
        imageCategory.setImageUrl(amazonS3.getUrl(buckName, fileName).toString());

        return imageCategoryRepository.save(imageCategory);
    }

    public List<ImageProduct> storeImageProducts(List<MultipartFile> files, String productId) {
        return files.stream()
                .map(file -> storeImageProduct(file, productId))
                .collect(Collectors.toList());
    }

    // 이미지 업로드(상품)
    public ImageProduct storeImageProduct(MultipartFile file, String productId) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, fileName, file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }
        ImageProduct createdImageProduct = imageMapper.fileToImageProduct(file, productRepository, productId);
        createdImageProduct.setImageUrl(amazonS3.getUrl(buckName, fileName).toString());

        return imageProductRepository.save(createdImageProduct);
    }

    // 이미지 업로드(맴버)
    public ImageMember storeImageMember(MultipartFile file, Long memberId) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, fileName, file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }

        ImageMember createdImage = imageMapper.fileToImageMember(file, memberRepository, memberId);
        createdImage.setImageUrl(amazonS3.getUrl(buckName, fileName).toString());


        return imageMemberRepository.save(createdImage);
    }

    // 이미지 삭제(상품)
    public void deleteImageProduct(String imageId) {
        // 파일 확인
        ImageProduct imageProduct = imageProductRepository.findById(imageId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
        try {
            amazonS3.deleteObject(buckName, imageProduct.getFileName());
            imageProductRepository.delete(imageProduct);
        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED);
        }
    }

    // 이미지 삭제(맴버)
    public void deleteImageMember(String imageId) {
        ImageMember imageMember = imageMemberRepository.findById(imageId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
        try {
            amazonS3.deleteObject(buckName, imageMember.getFileName());
            imageMemberRepository.delete(imageMember);
        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED);
        }
    }

    // 상품 이미지
    public ArrayList<ImageProduct> findImageProduct(String productId) {
        ArrayList<ImageProduct> imageProducts = imageProductRepository.findByProductId(productId);
        return imageProducts;
    }

    public ImageProduct findFirstImageProduct(String productId){
        return imageProductRepository.findFirstByProductProductId(productId);
    }

    // 맴버 이미지
    public ImageMember findImageMember(Long memberId) {
        Optional<ImageMember> optionalImageMember = imageMemberRepository.findByMemberId(memberId);

        ImageMember imageMember = optionalImageMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_IMAGE_MEMBER));
        return imageMember;
    }
}




