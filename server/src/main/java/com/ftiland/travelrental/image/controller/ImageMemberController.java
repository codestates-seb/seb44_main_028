package com.ftiland.travelrental.image.controller;

import com.ftiland.travelrental.common.annotation.CurrentMember;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.mapper.ImageMapper;
import com.ftiland.travelrental.image.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/members/images")
public class ImageMemberController {
    private ImageService imageService;
    private ImageMapper imageMapper;

    @Autowired
    public void imageController(ImageService imageService, ImageMapper imageMapper) {
        this.imageService = imageService;
        this.imageMapper = imageMapper;
    }

    // 사진 등록 ( 맴버 프로필 , Post)
    @PostMapping
    public ResponseEntity postImageMember(@RequestParam("imageFile") MultipartFile multipartFile, @CurrentMember Long memberId) {
        ImageMember imageMember = imageService.storeImageMember(multipartFile, memberId);
        ImageDto.ResponseForMember response = imageMapper.imageMemberToResponse(imageMember);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    // 사진 삭제 ( 맴버 프로필 , Delete)
    @DeleteMapping
    public HttpStatus deleteImageMember(@RequestParam("imageId") String imageId) {
        imageService.deleteImageMember(imageId);
        return HttpStatus.OK;
    }


    // 사진 조회 ( 맴버 , Get )
    @GetMapping
    public ResponseEntity getImageMember(@CurrentMember Long memberId) {
        ImageMember image = imageService.findImageMember(memberId);
        ImageDto.ResponseForMember response = imageMapper.imageMemberToResponse(image);

        return new ResponseEntity(response, HttpStatus.OK);
    }
}
