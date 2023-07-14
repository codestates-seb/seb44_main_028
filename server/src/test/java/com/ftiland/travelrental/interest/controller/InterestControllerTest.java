/*package com.ftiland.travelrental.interest.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.interest.mapper.InterestMapper;
import com.ftiland.travelrental.interest.service.InterestService;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.product.entity.Product;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;

import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(InterestMemberController.class)
public class InterestControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ImageService imageService;
    @MockBean
    private InterestService interestService;

    @MockBean
    private InterestMapper interestMapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("찜하기 생성 컨트롤러 성공")
    @WithMockUser(username = "사용자", roles = {"USER"})
    void CreateInterest_SUCCESS() throws Exception {

        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("둘리")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("제목입니다.")
                .content("내용입니다.")
                .member(member).build();

        Interest interest = Interest.builder().interestId("1234").product(product).member(member).build();

        InterestDto.GetResponseDto response = new InterestDto.GetResponseDto();
        response.setInterestId("1234");
        response.setProductId(product.getProductId());
        response.setInterestId(interest.getInterestId());
        response.setAddress(product.getAddress());
        response.setBaseFee(product.getBaseFee());



        given(interestService.createInterest(Mockito.anyLong(), Mockito.anyString())).willReturn(interest);
        given(interestMapper.interestToGetResponseDto(Mockito.any())).willReturn(response);

        // when
        ResultActions postActions = mockMvc.perform(
                post("/api/members/interests")
                        .param("memberId", member.getMemberId().toString())
                        .param("productId", product.getProductId().toString())
                        .with(csrf()));

        // then
        postActions
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("찜하기 해제 컨트롤러 성공")
    @WithMockUser(username = "사용자", roles = {"USER"})
    void DeleteInterest_Success() throws Exception {
        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("둘리")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("제목입니다.")
                .content("내용입니다.")
                .member(member).build();

        Interest interest = Interest.builder().interestId("1234").product(product).member(member).build();

        InterestDto.GetResponseDto response = new InterestDto.GetResponseDto();
        response.setInterestId("1234");
        response.setProductId(product.getProductId());
        response.setInterestId(interest.getInterestId());
        response.setAddress(product.getAddress());
        response.setBaseFee(product.getBaseFee());

        // when
        ResultActions postActions = mockMvc.perform(
                delete("/api/members/interests")
                        .param("memberId", member.getMemberId().toString())
                        .param("interestId", interest.getInterestId().toString())
                        .with(csrf()));

        // then
        postActions
                .andExpect(status().isOk());

    }

    @Test
    @DisplayName("찜목록 조회 컨트롤러 성공")
    @WithMockUser(username = "사용자", roles = {"USER"})
    void GetInterest_Success() throws Exception {

        // given
        Member member = Member.builder()
                .memberId(1L)
                .email("test@test.com")
                .displayName("둘리")
                .latitude(37.5793493362539)
                .longitude(126.91794995956589).build();

        Product product = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad3463")
                .title("제목입니다.")
                .content("내용입니다.")
                .member(member).build();
        Product product2 = Product.builder()
                .productId("91052a17-bca6-4fde-a586-a1d179ad34634")
                .title("제목입니다.")
                .content("내용입니다.")
                .member(member).build();
        Interest interest = Interest.builder().interestId("1234").product(product).member(member).build();
        Interest interest2 = Interest.builder().interestId("12345").product(product2).member(member).build();


        ArrayList<Interest> interests = new ArrayList<>();
        interests.add(interest2);
        interests.add(interest);
        InterestDto.ResponsesDto responses = interestMapper.interestsToResponsesDto(imageService ,interests,1,2);

        int size = interests.size();
        given(interestService.findInterest(Mockito.anyLong(),Mockito.anyInt(),Mockito.anyInt())).willReturn(interests);
        given(interestMapper.interestsToResponsesDto(Mockito.any(ImageService.class),Mockito.any(ArrayList.class),Mockito.anyInt(),Mockito.anyInt())).willReturn(responses);


        // when
        ResultActions getActions = mockMvc.perform(
                get("/api/members/interests")
                        .param("memberId",member.getMemberId().toString())
                        .param("page","1")
                        .param("size","2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(csrf()));

        // then
        getActions
                .andExpect(status().isOk());

    }
}

 */