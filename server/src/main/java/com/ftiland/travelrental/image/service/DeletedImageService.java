package com.ftiland.travelrental.image.service;

import com.ftiland.travelrental.image.dto.ImageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeletedImageService {
    private final DeletedImageRepository deletedImageRepository;

    @Transactional
    public void saveDeletedImage(String imageName){
        deletedImageRepository.save(new DeletedImage(imageName));
    }

    @Transactional
    public void deleteDeletedImage(String imageName){
        deletedImageRepository.deleteByName(imageName);
    }

    @Transactional
    public void deleteDeletedImages(List<ImageDto> images){
        images.forEach(i -> deleteDeletedImage(i.getFileName()));
    }

    @Transactional
    public List<DeletedImage> findDeletedImages(){
        return deletedImageRepository.findAll();
    }
}
