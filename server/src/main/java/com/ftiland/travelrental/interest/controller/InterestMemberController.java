package com.ftiland.travelrental.interest.controller;


import com.ftiland.travelrental.common.annotation.CurrentMember;
import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.interest.mapper.InterestMapper;
import com.ftiland.travelrental.interest.service.InterestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@Slf4j
@RestController
@RequestMapping("/api/members/interests")
public class InterestMemberController {

    private InterestService interestService;
    private InterestMapper interestMapper;


    @Autowired
    public InterestMemberController(InterestService interestService, InterestMapper interestMapper) {

        this.interestService = interestService;
        this.interestMapper = interestMapper;

    }


    // 특정 맴버의 관심목록 검색 ( 맴버 , Get )
    @GetMapping
    public ResponseEntity getInterest(@CurrentMember Long memberId,
                                      @Param("page") @Positive Integer page,
                                      @Param("size") @Positive Integer size) {
        InterestDto.ResponsesDto responses = interestService.findInterest(memberId, page, size);

        return new ResponseEntity(responses, HttpStatus.OK);
    }

    // 특정 맴버의 관심목록 검색 ( 맴버 , Get , 페이징 x )
    @GetMapping("/find")
    public ResponseEntity getInterest2(@CurrentMember Long memberId){

        InterestDto.Responses2Dto responses = interestService.findInterest(memberId);

        return new ResponseEntity(responses, HttpStatus.OK);
    }

    // 관심 목록에 추가 ( * , Post )
    @PostMapping
    public ResponseEntity postInterest(@CurrentMember Long memberId, @RequestBody InterestDto.PostRequestDto requestBody) {
        requestBody.setMemberId(memberId);
        Interest interest = interestService.createInterest(requestBody.getMemberId(), requestBody.getProductId());
        InterestDto.PostResponseDto response = interestMapper.interestToPostResponseDto(interest);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    // 관심 해제 ( 맴버 , Delete )
    @DeleteMapping
    public HttpStatus deleteInterest(@CurrentMember Long memberId, @RequestBody InterestDto.DeleteRequestDto requestBody) {
        requestBody.setMemberId(memberId);
        interestService.deleteInterest(requestBody.getMemberId(), requestBody.getInterestId());

        return HttpStatus.OK;
    }
}
