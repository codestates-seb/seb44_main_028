package com.ftiland.travelrental.image.service;

/*import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;*/
import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.entity.Image;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.mapper.ImageMapper;
import com.ftiland.travelrental.image.repository.ImageMemberRepository;
import com.ftiland.travelrental.image.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
@Service
public class FileStorageService {
/*
    private ImageMapper imageMapper;

    @Value("${cloud.aws.s3.bucket}")
    private String buckName;

    private final AmazonS3 amazonS3;

    private ImageRepository imageRepository;
    private ImageMemberRepository imageMemberRepository;

    @Autowired
    public FileStorageService(AmazonS3 amazonS3,ImageMapper imageMapper,ImageRepository imageRepository,ImageMemberRepository imageMemberRepository) {
        this.amazonS3 = amazonS3;
        this.imageMapper=imageMapper;
        this.imageRepository = imageRepository;
        this.imageMemberRepository = imageMemberRepository;
    }


    // 이미지 업로드(상품) (png,jpg만 저장가능) -> 구현 필요
    public Image storeImageProduct(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());


        try{
            // 파일이 비었을 때 예외처리
            if(file.isEmpty()){throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);}

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName,fileName,file.getInputStream(),metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        }
        catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        }
        Image createdImage= imageMapper.fileToimage(file);
        createdImage.setImageUrl(amazonS3.getUrl(buckName,fileName).toString());

        //return imageRepository.save(createdImage);
        return  createdImage;
    }

    // 이미지 업로드(맴버) (png,jpg만 저장가능) -> 구현 필요
    public ImageMember storeImageMember(MultipartFile file){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try{
            // 파일이 비었을 때 예외처리
            if(file.isEmpty()){throw new BusinessLogicException(ExceptionCode.IMAGE_EMPTY);}

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");
            //S3 버킷에 파일 업로드
            amazonS3.putObject(new PutObjectRequest(buckName,fileName,file.getInputStream(),metadata).withCannedAcl(CannedAccessControlList.PublicRead));
        }
        catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        }
        ImageMember createdImage= imageMapper.fileToImageMember(file);
        createdImage.setFileName(amazonS3.getUrl(buckName,fileName).toString());


        //return imageMemberRepository.save(createdImage);
        return createdImage;
    }

    // 이미지 삭제(상품)
    public void deleteFile(Image image) {
        try {
            amazonS3.deleteObject(buckName, image.getFileName());
            imageRepository.delete(image);
        }
        catch (BusinessLogicException e){
        throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        }
    }

    // 이미지 삭제(맴버)
    public void deleteFile(ImageMember imageMember){
        try {
            amazonS3.deleteObject(buckName, imageMember.getFileName());
            imageMemberRepository.delete(imageMember);
        }
        catch (BusinessLogicException e){
            throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);
        }
    }*/

}


