package com.ftiland.travelrental.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.dto.ImageDto;

import com.ftiland.travelrental.image.entity.DeletedImage;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
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

    public List<ImageDto> storeImages(List<MultipartFile> files) {
        if (files.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);
        }

        return files.stream()
                .map(file -> storeImage(file))
                .collect(Collectors.toList());
    }

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
            if ("defaultImage.png".equals(imageNames)) {
                amazonS3.deleteObject(new DeleteObjectRequest(buckName, imageNames));
            }
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
}



