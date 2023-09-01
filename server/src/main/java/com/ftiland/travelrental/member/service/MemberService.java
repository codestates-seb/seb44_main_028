package com.ftiland.travelrental.member.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.service.ImageMemberService;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import static com.ftiland.travelrental.common.exception.ExceptionCode.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class MemberService {

    @Value("${image.default.path}")
    private String defaultImageUrl;

    private final MemberRepository memberRepository;
    private final ImageService imageService;
    private final ImageMemberService imageMemberService;

    public void createMembers(List<Member> members) {
        members.forEach(member -> createMember(member));
    }

    public Member createMember(Member member) {
        member.setImageUrl(defaultImageUrl);
        Member savedMember = memberRepository.save(member);

        ImageDto imageDto = new ImageDto("defaultImage.png", defaultImageUrl, null);

        imageMemberService.createImageMember(member, imageDto);
        return savedMember;
    }

    public boolean existsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    public Member findMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
    }

    public MemberDto.Response findMemberDto(Long memberId) {
        return MemberDto.Response.from(findMember(memberId));
    }

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
    }

    public MemberDto.Response updateMember(String displayName, ImageDto image, Long memberId) {
        Member member = findMember(memberId);

        Optional.ofNullable(displayName)
                .ifPresent(name -> member.setDisplayName(name));
        // 이전 이미지들 이름
        String preImageFileName = imageMemberService.findImageFileName(memberId);
        boolean deleteCheck = !Objects.isNull(image);

        Optional.ofNullable(image)
                .ifPresent(i -> {
                    imageMemberService.deleteImageMember(member);
                    imageMemberService.createImageMember(member, i);
                });

        return MemberDto.Response.from(member, preImageFileName, deleteCheck);
    }

    public void deleteMember(Long memberId) {
        Member member = findMember(memberId);
        memberRepository.deleteById(memberId);
    }

}