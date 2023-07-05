package com.ftiland.travelrental.image.mapper;

import com.ftiland.travelrental.image.entity.Image;
import com.ftiland.travelrental.image.entity.ImageMember;
import org.mapstruct.Mapper;
import org.springframework.web.multipart.MultipartFile;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    default Image fileToimage(MultipartFile multipartFile){
        Image image = new Image();
        image.setFileName(multipartFile.getOriginalFilename());
        image.setFileType(multipartFile.getContentType());
        //image.setProduct();

        return image;
    }

    default ImageMember fileToImageMember(MultipartFile multipartFile){
        ImageMember imageMember = new ImageMember();
        imageMember.setFileName(multipartFile.getOriginalFilename());
        imageMember.setFileType(multipartFile.getContentType());
        //image.setMember();

        return imageMember;
    }
}
