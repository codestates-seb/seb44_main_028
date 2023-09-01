package com.ftiland.travelrental.category.service;

import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.category.dto.CreateCategory;
import com.ftiland.travelrental.category.entity.Category;
import com.ftiland.travelrental.category.repository.CategoryRepository;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageCategory;
import com.ftiland.travelrental.image.repository.ImageCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ImageCategoryRepository imageCategoryRepository;

    @Cacheable(value = "categories")
    public List<CategoryDto> findCategoriesAll() {
        return categoryRepository.findAll().stream()
                .map(CategoryDto::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public CreateCategory.Response createCategory(CreateCategory.Request request, ImageDto imageDto) {

        ImageCategory image = createImageCategory(imageDto);

        Category category = Category.builder()
                .categoryId(request.getCategoryId())
                .title(request.getTitle())
                .image(image).build();

        Category savedCategory = categoryRepository.save(category);
        return CreateCategory.Response.from(savedCategory);
    }

    @Transactional
    public ImageCategory createImageCategory(ImageDto imageDto) {
        ImageCategory imageCategory = new ImageCategory();
        imageCategory.setImageId(UUID.randomUUID().toString());
        imageCategory.setFileName(imageDto.getFileName());
        imageCategory.setImageUrl(imageDto.getImageUrl());
        imageCategory.setFileType(imageDto.getFileType());

        return imageCategoryRepository.save(imageCategory);
    }
}
