package com.ftiland.travelrental.image.controller;

import com.ftiland.travelrental.image.entity.Image;
import com.ftiland.travelrental.image.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


// 테스트용
@RestController("/")
public class ImageController {
    private FileStorageService fileStorageService;

    @Autowired
    public void imageController(FileStorageService fileStorageService){
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("image")
    public ResponseEntity postImage(@RequestParam("imageFile")MultipartFile imageFile,@RequestParam("productId")String productId){

        Image image = fileStorageService.storeImageProduct(imageFile,productId);

        return new ResponseEntity(image, HttpStatus.OK);
    }

    @GetMapping("image")
    public ResponseEntity postImage2(){


    return new ResponseEntity("dasd", HttpStatus.OK);
    }


}