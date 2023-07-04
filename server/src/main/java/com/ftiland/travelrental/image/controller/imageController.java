package com.ftiland.travelrental.image.controller;

import com.ftiland.travelrental.image.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController("/")
public class imageController {
    private FileStorageService fileStorageService;

    @Autowired
    public void imageController(FileStorageService fileStorageService){
        this.fileStorageService = fileStorageService;
    }

    @PostMapping("image")
    public ResponseEntity example01(@RequestParam("imageFile")MultipartFile imageFile){
        String url = fileStorageService.storeFile(imageFile);

        return new ResponseEntity(url, HttpStatus.OK);
    }
}
