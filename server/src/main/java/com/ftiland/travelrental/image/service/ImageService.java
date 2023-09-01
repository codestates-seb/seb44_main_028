package com.ftiland.travelrental.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.dto.ImageDto;

import com.ftiland.travelrental.image.utils.FileNameGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ImageService {


    //@Value("${cloud.aws.s3.bucket}")
    private String buckName = "seb44main028image-bucket";

    private final AmazonS3 amazonS3;
    private final DeletedImageService deletedImageService;

    @Transactional
    public List<ImageDto> storeImages(List<MultipartFile> files) {
        if (files.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
        }

        return files.stream()
                .map(file -> storeImage(file))
                .collect(Collectors.toList());
    }

    @Transactional
    // 이미지 업로드(상품)
    public ImageDto storeImage(MultipartFile file) {

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");

            String fileName = createImageName(file.getOriginalFilename());

            // 지워야 하는 저장 목록에 넣기
            deletedImageService.saveDeletedImage(fileName);

            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, fileName, file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
            String imageUrl = amazonS3.getUrl(buckName, fileName).toString();

            // imageCategory.setFileName(fileNameGenerator.uuidName(imageCategory.getImageId(), imageCategory.getFileType()));


            return new ImageDto(fileName, imageUrl, file.getContentType());
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }
    }

    private String createImageName(String originalImageName) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(originalImageName);
        return uuid + ext;
    }

    private String extractExt(String originalImageName) {
        int idx = originalImageName.lastIndexOf(".");
        return originalImageName.substring(idx);
    }

    public void deleteImages(List<String> imageNames) {
        // 파일 확인
        imageNames.forEach(i -> deleteImage(i));
    }

    // 이미지 삭제(상품)
    public void deleteImage(String imageNames) {
        // 파일 확인
        try {
            if (imageNames != "defaultImage.png" || imageNames != null) {
                amazonS3.deleteObject(new DeleteObjectRequest(buckName, imageNames));
            }
        } catch (AmazonS3Exception e) {

        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED);
        }
    }

    // 하루에 한번 고아 이미지 삭제 로직
    @Scheduled(cron = "0 0 0 * * *")
    public void deleteOrphanImages() {
        List<DeletedImage> deletedImages = deletedImageService.findDeletedImages();
        List<String> images = deletedImages.stream().map(i -> i.getName()).collect(Collectors.toList());
        deleteImages(images);
    }
    /*@Transactional
    // 이미지 업로드(카테고리)
    public ImageCategory storeImageCategory(MultipartFile file, String categoryId) {

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }
            ImageCategory imageCategory = imageMapper.fileToImageCategory(file, categoryRepository, categoryId);

            imageCategory.setFileName(fileNameGenerator.uuidName(imageCategory.getImageId(), imageCategory.getFileType()));

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
    }*/

/*
    @Transactional
    // 이미지 업로드(맴버)
    public ImageMember storeImageMember(MultipartFile file, Long memberId) {

        try {
            // 파일이 비었을 때 예외처리
            if (file.isEmpty()) {
                throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
            }


            ImageMember createdImage = imageMapper.fileToImageMember(file, memberRepository, memberId);
            createdImage.setFileName(fileNameGenerator.uuidName(createdImage.getImageId(), createdImage.getFileType()));

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");

            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName, createdImage.getFileName(), file.getInputStream(), metadata).withCannedAcl(CannedAccessControlList.PublicRead));
            createdImage.setImageUrl(amazonS3.getUrl(buckName, createdImage.getFileName()).toString());

            return imageMemberRepository.save(createdImage);
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_SAVE_FAILED);
        }

    }*/

 /*   @Transactional
    // 이미지 삭제(맴버)
    public void deleteImageMember(String imageId) {
        ImageMember imageMember = imageMemberRepository.findById(imageId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED));
        try {
            if (imageMember.getFileName() != "defaultImage.png" || imageMember.getFileName() != null) {
                amazonS3.deleteObject(new DeleteObjectRequest(buckName, imageMember.getImageUrl()));
            }
            imageMemberRepository.delete(imageMember);
        } catch (BusinessLogicException e) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_DELETE_FAILED);
        }
    }

    public ImageProduct findMainImageProduct(String productId) {
        ImageProduct imageProduct = imageProductRepository.findFirstByProductProductId(productId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_EMPTY));

        return imageProduct;
    }*/

/*
    public ImageProduct findFirstImageProduct(String productId) {
        return imageProductRepository.findFirstByProductProductIdOrderByCreatedAtAsc(productId);
    }*/

   /* // 맴버 이미지
    public ImageMember findImageMember(Long memberId) {
        Optional<ImageMember> optionalImageMember = imageMemberRepository.findByMemberId(memberId);

        ImageMember imageMember = optionalImageMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_IMAGE_MEMBER));
        return imageMember;
    }*/
}



