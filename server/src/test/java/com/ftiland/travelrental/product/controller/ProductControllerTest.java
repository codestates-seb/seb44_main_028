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
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static com.ftiland.travelrental.util.ApiDocumentUtils.getRequestPreProcessor;
import static com.ftiland.travelrental.util.ApiDocumentUtils.getResponsePreProcessor;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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

   /* @Test
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


        byte[] fileContent = "Test file content".getBytes();
        byte[] fileContent2 = "Test file content2".getBytes();

        List<MockMultipartFile> imageFiles = new ArrayList<>();
        imageFiles.add(new MockMultipartFile("images", "image1.jpg", "image/jpeg", fileContent));
        imageFiles.add(new MockMultipartFile("images", "image2.jpg", "image/jpeg", fileContent2));


        CreateProduct.Response response = CreateProduct.Response.from(product, categories);

        given(productService.createProduct(any(), anyLong(), any()))
                .willReturn(response);


        // when
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.multipart("/api/products")
                .file(imageFiles.get(0))
                .file(imageFiles.get(1))
                // ... 필요한 만큼 파일 추가
                .param("request", objectMapper.writeValueAsString(request))
                .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                .header("Authorization", "Bearer YOUR_ACCESS_TOKEN"); // 예시로 인증 토큰 추가

        ResultActions result = mockMvc.perform(requestBuilder.with(csrf()));

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

        UpdateProduct.Response response = UpdateProduct.Response.from(product, List.of());

        given(productService.updateProduct(any(), anyString(), anyLong(), any()))
                .willReturn(response);

        // when
        ResultActions result = mockMvc.perform(patch("/api/products/d2fb011a-9910-4659-bbc0-803c5b9d1117")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .content(objectMapper.writeValueAsString(request))
                .with(csrf()));

        // then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.productId").value(response.getProductId()))
                .andDo(print());
    }*/

    @Test
//    @WithMockUser(username = "사용자", roles = {"USER"})
    void deleteProduct_SUCCESS() throws Exception {
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
                .member(member).build();

        // when
        ResultActions result = mockMvc.perform(delete("/api/products/645ac561-a69b-4b77-b390-a3fbdc7a8ce7")
                .header("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJtZW1iZXJJZCI6MSwic3ViIjoiZGFkYSIsImlhdCI6MTY5MDE3NTMzMiwiZXhwIjoxNjkwMTc3MTMyfQ.yDA9iTI1O4csrlQ_te8meFhcAcqji05dIU935R7pzZIMu4fBRd4j_pka9rXepQ-DcDa1bWCj64VqFcuqh0gINg")
                .with(csrf()));

        // then
        result.andExpect(status().isOk())
                .andDo(print())
                .andDo(document("delete-product",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                parameterWithName("product-id").description("상품ID")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("Access token for authentication")
                        )
                ));
    }
   /* @Test
    @DisplayName("멤버 탈퇴")
    void removeMemberTest() throws Exception {
        //given
        Long memberId = 1L;
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", 1);
        claims.put("displayName", "FTIland");
        claims.put("email", "ftIland@email.com");

        String subject = "ftIland@email.com";
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
        doNothing().when(memberService).deleteMember(memberId);

        //when
        ResultActions actions =
                mockMvc.perform(
                        delete("/api/members", memberId)
                                .header("Authorization", "Bearer " + accessTokenForUser));

        //then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "멤버 삭제"
                ));
    }
}*/
}