package com.ftiland.travelrental.interest.controller;

import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.interest.mapper.InterestMapper;
import com.ftiland.travelrental.interest.service.InterestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/members/interests")
public class InterestMemberController {

    private InterestService interestService;
    private InterestMapper interestMapper;
    private ImageService imageService;

    @Autowired
    public InterestMemberController(InterestService interestService, InterestMapper interestMapper,ImageService imageService) {

        this.interestService = interestService;
        this.interestMapper = interestMapper;
        this.imageService = imageService;
    }


    // 특정 맴버의 관심목록 검색 ( 맴버 , Get )
    @GetMapping
    public ResponseEntity getInterest(@Param("memberId")Long memberId, @Param("page")@Positive int page, @Param("size")@Positive int size){

        ArrayList<Interest> interests = interestService.findInterest(memberId,page,size);
        InterestDto.ResponsesDto responses = interestMapper.interestsToResponsesDto(imageService,interests,page,size);

        return new ResponseEntity(responses, HttpStatus.OK);
    }

    // 관심 목록에 추가 ( * , Post )
    @PostMapping
    public ResponseEntity postInterest(@Param("memberId") Long memberId, @Param("productId") String productId) {
        Interest interest = interestService.createInterest(memberId, productId);
        InterestDto.PostResponseDto response = interestMapper.interestToPostResponseDto(interest);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    // 관심 해제 ( 맴버 , Delete )
    @DeleteMapping
    public HttpStatus deleteInterest(@Param("memberId") Long memberId, @Param("interestId") String interestId) {
        interestService.deleteInterest(memberId, interestId);

        return HttpStatus.OK;
    }
}
