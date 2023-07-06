package com.ftiland.travelrental.interest.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.interest.repository.InterestRepository;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Test 필요
@Service
public class InterestService {
    private MemberRepository memberRepository;
    private ProductRepository productRepository;
    private InterestRepository interestRepository;

    @Autowired
    public  InterestService (MemberRepository memberRepository, ProductRepository productRepository, InterestRepository interestRepository){
        this.memberRepository = memberRepository;
        this.productRepository = productRepository;
        this.interestRepository = interestRepository;
    }
    // 특정 관심객체 검색
    public Optional<Interest> findVerifiedInterest(Long memberId, String productId){
        Optional<Interest> optionalInterest = interestRepository.findByProductIdMemberId(memberId,productId);
        return optionalInterest;
    }

    // 한 사용자의 관심 목록
    public List<Interest> findInterest(Long memberId){
        return interestRepository.findByMemberId(memberId);
    }

    // 관심 상품 등록
    public Interest createInterest(Long memberId,String productId){

        // 이미 관심 목록에 등록했으면 에러 리턴
        if(findVerifiedInterest(memberId,productId)!=null){throw new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION);}

        Member member = memberRepository.findById(memberId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Product product = productRepository.findById(productId).orElseThrow(()->new BusinessLogicException(ExceptionCode.PRODUCT_NOT_FOUND));

        Interest interest = Interest.builder().member(member).product(product).build();

        return interestRepository.save(interest);
    }

    // 관심 상품 해제
    public void deleteInterest(Long memberId,String interestId){
        Interest interest = interestRepository.findById(interestId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.NOT_IMPLEMENTATION));
        if ( interest.getMember().getMemberId() == memberId){
            interestRepository.delete(interest);
        }
    }
}
