package com.ftiland.travelrental.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
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
import com.ftiland.travelrental.image.utils.FileNameGenerator;
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

    //@Value("${cloud.aws.s3.bucket}")
    private String buckName="seb44main028image-bucket";

    private final AmazonS3 amazonS3;

    private ImageProductRepository imageProductRepository;
    private ImageMemberRepository imageMemberRepository;
    private ProductRepository productRepository;
    private MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final ImageCategoryRepository imageCategoryRepository;
    private FileNameGenerator fileNameGenerator ;

    @Autowired
    public ImageService(AmazonS3 amazonS3, ImageMapper imageMapper, ImageProductRepository imageProductRepository,
                        ImageMemberRepository imageMemberRepository, MemberRepository memberRepository,
                        ProductRepository productRepository,
                        CategoryRepository categoryRepository,
                        ImageCategoryRepository imageCategoryRepository,
                        FileNameGenerator fileNameGenerator) {
        this.amazonS3 = amazonS3;
        this.imageMapper = imageMapper;
        this.imageProductRepository = imageProductRepository;
        this.imageMemberRepository = imageMemberRepository;
        this.productRepository = productRepository;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.imageCategoryRepository = imageCategoryRepository;
        this.fileNameGenerator = fileNameGenerator;
    }

    // 이미지 업로드(카테고리)
    public ImageCategory storeImageCategory(MultipartFile file, String categoryId) {

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }
            ImageCategory imageCategory = imageMapper.fileToImageCategory(file, categoryRepository, categoryId);

            imageCategory.setFileName(fileNameGenerator.uuidName(imageCategory.getImageId(),imageCategory.getFileType()));

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, imageCategory.getFileName(), file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
            imageCategory.setImageUrl(amazonS3.getUrl(buckName, imageCategory.getFileName()).toString());

            return imageCategoryRepository.save(imageCategory);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }


    }

    public List<ImageProduct> storeImageProducts(List<MultipartFile> files, String productId) {
        return files.stream()
                .map(file -> storeImageProduct(file, productId))
                .collect(Collectors.toList());
    }

    // 이미지 업로드(상품)
    public ImageProduct storeImageProduct(MultipartFile file, String productId) {

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }
            ImageProduct createdImageProduct = imageMapper.fileToImageProduct(file, productRepository, productId);
            createdImageProduct.setFileName(fileNameGenerator.uuidName(createdImageProduct.getImageId(),createdImageProduct.getFileType()));

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");

            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, createdImageProduct.getFileName(), file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
            createdImageProduct.setImageUrl(amazonS3.getUrl(buckName, createdImageProduct.getFileName()).toString());

            return imageProductRepository.save(createdImageProduct);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }
    }

    // 이미지 업로드(맴버)
    public ImageMember storeImageMember(MultipartFile file, Long memberId) {

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }

            ImageMember createdImage = imageMapper.fileToImageMember(file, memberRepository, memberId);
            createdImage.setFileName(fileNameGenerator.uuidName(createdImage.getImageId(),createdImage.getFileType()));
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");

            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, createdImage.getFileName(), file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
            createdImage.setImageUrl(amazonS3.getUrl(buckName,createdImage.getFileName()).toString());

            return imageMemberRepository.save(createdImage);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }
    }

    public void deleteImageProducts(String productId) {
        ArrayList<ImageProduct> images = imageProductRepository.findByProductId(productId);
        // 파일 확인
        imageProductRepository.deleteAll(images);
    }

    // 이미지 삭제(상품)
    public void deleteImageProduct(String imageId) {
        // 파일 확인
        ImageProduct imageProduct = imageProductRepository.findById(imageId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED));
        try {
            if(imageProduct.getFileName()!="defaultImage.png"||imageProduct.getFileName()!=null){
                amazonS3.deleteObject(new DeleteObjectRequest(buckName,imageProduct.getFileName()));
            }
            imageProductRepository.delete(imageProduct);
        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED);
        }
    }

    // 이미지 삭제(맴버)
    public void deleteImageMember(String imageId) {
        ImageMember imageMember = imageMemberRepository.findById(imageId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED));
        try {
            if(imageMember.getFileName()!= "defaultImage.png" ||imageMember.getFileName()!=null){
                amazonS3.deleteObject(new DeleteObjectRequest(buckName,imageMember.getImageUrl()));
            }
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

    // 상품 이미지
    public List<ImageProduct> findImageProducts(String productId) {
        return imageProductRepository.findByProductProductIdOrderByCreatedAtAsc(productId);
    }

    public ImageProduct findFirstImageProduct(String productId){
        return imageProductRepository.findFirstByProductProductIdOrderByCreatedAtAsc(productId);
    }

    // 맴버 이미지
    public ImageMember findImageMember(Long memberId) {
        Optional<ImageMember> optionalImageMember = imageMemberRepository.findByMemberId(memberId);

        ImageMember imageMember = optionalImageMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_IMAGE_MEMBER));
        return imageMember;
    }
}



