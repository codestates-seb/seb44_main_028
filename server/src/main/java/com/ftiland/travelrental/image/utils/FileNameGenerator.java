package com.ftiland.travelrental.image.utils;

import org.springframework.stereotype.Component;

@Component
public class FileNameGenerator {

    public String uuidName(String uuid,String fileType){
        String extension = fileType.substring(fileType.lastIndexOf("/")+1);
        String fileName = uuid + "."+extension;

        return fileName;
    }
}
