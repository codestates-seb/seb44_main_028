package com.ftiland.travelrental.member.service;


import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

}
