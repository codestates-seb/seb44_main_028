package com.ftiland.travelrental.category.controller;

import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    private ResponseEntity<List<CategoryDto>> findCategoriesAll() {
        return ResponseEntity.ok(categoryService.findCategoriesAll());
    }
}
