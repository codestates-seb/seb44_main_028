package com.ftiland.travelrental.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Component
@Service
public class FileStorageService {

    @Value("${cloud.aws.s3.bucket}")
    private String buckName;

    private final AmazonS3 amazonS3;

    @Autowired
    public FileStorageService(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }
    // S3 파일명 중복 검사?
    public String storeFile(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try{
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName,fileName,file.getInputStream(),metadata).withCannedAcl(CannedAccessControlList.PublicRead));}
            catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        }
        String fileUrl = amazonS3.getUrl(buckName,fileName).toString();

        return fileUrl;
    }
}


