package com.ftiland.travelrental.image.controller;

import com.ftiland.travelrental.image.entity.Image;
import com.ftiland.travelrental.image.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController("/")
public class ImageController {
    private FileStorageService fileStorageService;

    @Autowired
    public void imageController(FileStorageService fileStorageService){
        this.fileStorageService = fileStorageService;
    }

    /*@PostMapping("image")
    public ResponseEntity postImage(@RequestParam("imageFile")MultipartFile imageFile){

        Image image = fileStorageService.storeImageProduct(imageFile);

        return new ResponseEntity(image, HttpStatus.OK);
    }*/
    @GetMapping("image")
    public ResponseEntity postImage2(){


    return new ResponseEntity("dasd", HttpStatus.OK);
    }

}
