package com.ftiland.travelrental.interest.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.interest.mapper.InterestMapper;
import com.ftiland.travelrental.interest.repository.InterestRepository;

import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.repository.ProductRepository;
import com.ftiland.travelrental.product.service.ProductService;
import com.ftiland.travelrental.reservation.dto.GetBorrowReservations;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Optional;
import java.util.UUID;


// Test 필요
@Slf4j
@Service
public class InterestService {
    private InterestRepository interestRepository;
    private MemberService memberService;
    private ImageService imageService;
    private InterestMapper interestMapper;
    private ProductService productService;

    @Autowired
    public  InterestService ( InterestRepository interestRepository, MemberService memberService, ImageService imageService, InterestMapper interestMapper,ProductService productService){
        this.interestRepository = interestRepository;
        this.memberService = memberService;
        this.imageService = imageService;
        this.interestMapper = interestMapper;

        this.productService = productService;

    }

    // 특정 관심객체 검색
    public Optional<Interest> findVerifiedInterest(Long memberId, String productId){

        Optional<Interest> optionalInterest = interestRepository.findByProductIdMemberId(memberId,productId);
        return optionalInterest;
    }


    // 한 사용자의 관심 목록
    public InterestDto.ResponsesDto  findInterest(Long memberId,int page,int size){
        Pageable pageable = PageRequest.of(page,size);

        // 맴버 존재하는지 검사
        memberService.findMember(memberId);
        long start = System.currentTimeMillis();
        Page<Interest> pagedList = interestRepository.findByMemberId(memberId, pageable);
        long end = System.currentTimeMillis();
        log.info("findByMemberId total time = {}", end - start);
        long start2 = System.currentTimeMillis();
        InterestDto.ResponsesDto responses = interestMapper.interestsToResponsesDto(pagedList);
        long end2 = System.currentTimeMillis();
        log.info("interestsToResponsesDto total time = {}", end2 - start2);


        return responses;
    }

    // 한 사용자의 관심 목록 (페이징 x)
    public InterestDto.Responses2Dto  findInterest(Long memberId){

        // 맴버 존재하는지 검사
        memberService.findMember(memberId);
        ArrayList<Interest> interestList = interestRepository.findByMemberId2(memberId);
        InterestDto.Responses2Dto responses = interestMapper.interestsToResponses2Dto(interestList);

        return responses;
    }

    // 관심 상품 등록
    public Interest createInterest(Long memberId,String productId){

        // 이미 관심 목록에 등록했으면 에러 리턴
        if (findVerifiedInterest(memberId,productId).isPresent()){throw new BusinessLogicException(ExceptionCode.INTEREST_EXISTS);}
        Member member = memberService.findMember(memberId);
        Product product = productService.findProduct(productId);
        Interest interest = Interest.builder().interestId(UUID.randomUUID().toString()).member(member).product(product).build();

        return interestRepository.save(interest);
    }

    // 관심 상품 해제
    public void deleteInterest(Long memberId,String interestId){
        Interest interest = interestRepository.findById(interestId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.INTEREST_NOT_EXISTS));
        if ( interest.getMember().getMemberId() == memberId){
            interestRepository.delete(interest);
        }
    }
}
