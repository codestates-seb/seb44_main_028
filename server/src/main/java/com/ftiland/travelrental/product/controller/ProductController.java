package com.ftiland.travelrental.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.product.dto.CreateProduct;
import com.ftiland.travelrental.product.dto.UpdateProduct;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;
    @MockBean
    private ImageService imageService;

    /*@Test
    @WithMockUser(username = "사용자", roles = {"USER"})
    void createProduct_SUCCESS() throws Exception {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("이명규")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("제목입니다.")
                .content("내용입니다.")
                .content("내용입니다.")
                .member(member).build();

        List<CategoryDto> categories = List.of(CategoryDto.builder()
                        .categoryId("318baf68-71c8-410c-8e1d-21852fbf088e")
                        .title("등산").build(),
                CategoryDto.builder()
                        .categoryId("7c08b19f-5846-4b6b-a11e-861d004f8151")
                        .title("캠핑").build());

        CreateProduct.Request request = new CreateProduct.Request(
                "제목", 1000, 500, 1000, "내용", 3,
                List.of("318baf68-71c8-410c-8e1d-21852fbf088e", "7c08b19f-5846-4b6b-a11e-861d004f8151")
        );

        CreateProduct.Response response = CreateProduct.Response.from(product, categories);

        given(productService.createProduct(any(), anyLong()))
                .willReturn(response);


        // when
        ResultActions result = mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .with(csrf()));

        // then
        result.andExpect(status().isCreated())
                .andExpect(jsonPath("$.productId").value(response.getProductId()))
                .andDo(print());
    }

    @Test
    @WithMockUser(username = "사용자", roles = {"USER"})
    void updateProduct_SUCCESS() throws Exception {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("이명규")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("제목입니다.")
                .content("내용입니다.")
                .content("내용입니다.")
                .member(member).build();

        List<CategoryDto> categories = List.of(CategoryDto.builder()
                        .categoryId("318baf68-71c8-410c-8e1d-21852fbf088e")
                        .title("등산").build(),
                CategoryDto.builder()
                        .categoryId("7c08b19f-5846-4b6b-a11e-861d004f8151")
                        .title("캠핑").build());

        UpdateProduct.Request request = UpdateProduct.Request.builder()
                .title("제목")
                .baseFee(1000)
                .feePerDay(500)
                .build();

        UpdateProduct.Response response = UpdateProduct.Response.from(product);

        given(productService.updateProduct(any(), anyString(), anyLong()))
                .willReturn(response);

        // when
        ResultActions result = mockMvc.perform(patch("/api/products/d2fb011a-9910-4659-bbc0-803c5b9d1117")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .with(csrf()));

        // then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(response.getProductId()))
                .andDo(print());
    }*/

}