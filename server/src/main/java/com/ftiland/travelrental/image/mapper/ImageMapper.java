package com.ftiland.travelrental.image.mapper;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.entity.Image;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.repository.ProductRepository;
import org.mapstruct.Mapper;
import org.springframework.web.multipart.MultipartFile;

@Mapper(componentModel = "spring")
public interface ImageMapper {

    default Image fileToimage(MultipartFile multipartFile, ProductRepository productRepository,String productId){
        Image image = new Image();
        image.setFileName(multipartFile.getOriginalFilename());
        image.setFileType(multipartFile.getContentType());

        // service 구현 필요
        Product product = productRepository.findById(productId).orElseThrow(()->new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
        image.setProduct(product);
        return image;
    }


    default ImageMember fileToImageMember(MultipartFile multipartFile,MemberRepository memberRepository,Long memberId){
    ImageMember imageMember = new ImageMember();
        imageMember.setFileName(multipartFile.getOriginalFilename());
        imageMember.setFileType(multipartFile.getContentType());

        // service 구현 필요
        Member member = memberRepository.findById(memberId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
        imageMember.setMember(member);

        return imageMember;
    }
}
