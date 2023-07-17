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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;


import java.util.Optional;
import java.util.UUID;


// Test 필요
@Service
public class InterestService {
    private MemberRepository memberRepository;
    private ProductRepository productRepository;
    private InterestRepository interestRepository;
    private MemberService memberService;
    private ImageService imageService;
    private InterestMapper interestMapper;

    @Autowired
    public  InterestService (MemberRepository memberRepository, ProductRepository productRepository, InterestRepository interestRepository, MemberService memberService, ImageService imageService, InterestMapper interestMapper){
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
        this.interestRepository = interestRepository;
        this.memberService = memberService;
        this.imageService = imageService;
        this.interestMapper = interestMapper;


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
        Page<Interest> pagedList = interestRepository.findByMemberId(memberId, pageable);
        InterestDto.ResponsesDto responses = interestMapper.interestsToResponsesDto(imageService,pagedList);

        return responses;
    }

    // 관심 상품 등록
    public Interest createInterest(Long memberId,String productId){

        // 이미 관심 목록에 등록했으면 에러 리턴
        if (findVerifiedInterest(memberId,productId).isPresent()){throw new BusinessLogicException(ExceptionCode.INTEREST_EXISTS);}

        Member member = memberRepository.findById(memberId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Product product = productRepository.findById(productId).orElseThrow(()->new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));

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
