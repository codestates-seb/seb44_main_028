package com.ftiland.travelrental.member.service;


import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.dto.MemberPatchDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
import com.ftiland.travelrental.product.dto.UpdateProduct;
import com.ftiland.travelrental.product.entity.Product;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.ftiland.travelrental.common.exception.ExceptionCode.MEMBER_NOT_FOUND;
import static com.ftiland.travelrental.common.exception.ExceptionCode.PRODUCT_NOT_FOUND;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member) {
        if(!existsEmail(member.getEmail())) {
            Member savedMember = memberRepository.save(member);
            return savedMember;
        }

        return null;
    }

    public Member getMember(Long memberId) {
        return findVerfiedMember(memberId);
    }

    private boolean existsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    private Member findVerfiedMember(Long id) {
        Optional<Member> optionalMember = memberRepository.findById(id);
        Member findMember = optionalMember.orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)
                );
        return findMember;
    }

    private MemberDto.Response updateMember(MemberPatchDto.Request request, Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));

        Optional.ofNullable(request.getDisplayName())
                .ifPresent(displayName -> member.setDisplayName(displayName));
        Optional.ofNullable(request.getLatitude())
                .ifPresent(latitude -> member.setLatitude(latitude));
        Optional.ofNullable(request.getLongitude())
                .ifPresent(longitude -> member.setLongitude(longitude));

        return MemberDto.Response.from(member);

    }

}
