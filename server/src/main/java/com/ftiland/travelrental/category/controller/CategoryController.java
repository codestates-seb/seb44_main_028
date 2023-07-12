package com.ftiland.travelrental.category.controller;

import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.category.dto.CreateCategory;
import com.ftiland.travelrental.category.service.CategoryService;
import com.ftiland.travelrental.image.entity.ImageCategory;
import com.ftiland.travelrental.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final ImageService imageService;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> findCategoriesAll() {
        return ResponseEntity.ok(categoryService.findCategoriesAll());
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestParam String categoryId,
                                            @RequestParam String title,
                                            @RequestParam("image") MultipartFile imageFile){

        CreateCategory.Request request = new CreateCategory.Request(categoryId, title);
        ImageCategory imageCategory = imageService.storeImageCategory(imageFile, categoryId);

        return ResponseEntity.ok(categoryService.createCategory(request, imageCategory));
    }
}
