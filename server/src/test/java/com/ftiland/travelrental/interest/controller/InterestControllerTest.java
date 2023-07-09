package com.ftiland.travelrental.interest.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ftiland.travelrental.category.dto.CategoryDto;
import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.interest.mapper.InterestMapper;
import com.ftiland.travelrental.interest.service.InterestService;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.product.dto.CreateProduct;
import com.ftiland.travelrental.product.dto.UpdateProduct;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class InterestControllerTest {
    @Autowired
    private MockMvc mockMvc;


    @MockBean
    private InterestService interestService;

    @MockBean
    private InterestMapper interestMapper;

    @MockBean
    private ObjectMapper objectMapper;
/*
    @MockBean
    private  InterestContro

 */
    @Test
    @WithMockUser(username = "사용자",roles = {"USER"})
    void CreateInteterest_SUCCESS() throws Exception{
        // given

        Member member = new Member(1L,
                "test@test.com",
                "둘리",
                37.5793493362539,
                126.91794995956589);

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("제목입니다.")
                .content("내용입니다.")
                .content("내용입니다.")
                .member(member).build();

        MultiValueMap<String, String> info = new LinkedMultiValueMap<>();

        info.add("memberId", "1L");
        info.add("productId", "1234");

        Interest interest = Interest.builder().interestId("1234").product(product).member(member).build();

        InterestDto.ResponseDto response = new InterestDto.ResponseDto();
        response.setInterestId("1234");
        response.setProductId("91052a17-bca6-4fde-a586-a1d179ad3463");
        response.setMemberId(1L);

        given(interestService.createInterest(Mockito.anyLong(), Mockito.anyString())).willReturn(interest);

        // when
        ResultActions actions = mockMvc.perform(
                    post("/api/members/interests")
                    .params(info))
                    .andExpect(status().isCreated());

        // then
        actions.andExpect(status().isCreated()).andExpect(header().string("Location",is(startsWith("/api/members/"))));

    }
}
