package com.ftiland.travelrental.member.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.repository.ImageMemberRepository;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.dto.MemberPatchDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.ftiland.travelrental.common.exception.ExceptionCode.MEMBER_NOT_FOUND;

@Service
public class MemberService {

    @Value("${image.default.path}")
    private String defaultImageUrl;

    private final MemberRepository memberRepository;
    private final ImageMemberRepository imageMemberRepository;
    private final ImageService imageService;

    @Autowired
    public MemberService(MemberRepository memberRepository, ImageService imageService, ImageMemberRepository imageMemberRepository) {
        this.memberRepository = memberRepository;
        this.imageMemberRepository = imageMemberRepository;
        this.imageService = imageService;
    }

    public void createMembers(List<Member> members) {
        members.forEach(member -> createMember(member));
    }

    public Member createMember(Member member) {
        member.setImageUrl(defaultImageUrl);
        Member savedMember = memberRepository.save(member);
        ImageMember imageMember = new ImageMember();
        imageMember.setImageUrl(defaultImageUrl);
        imageMember.setFileName("defaultImage.png");
        imageMember.setMember(savedMember);
        imageMember.setImageId(UUID.randomUUID().toString());
        imageMemberRepository.save(imageMember);
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

    public Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
    }


    public MemberDto.Response updateMember(String displayName, MultipartFile imageFile, Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
        ImageMember imageMember = imageMemberRepository.findByMemberId(memberId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.IMAGE_EMPTY));

        imageService.deleteImageMember(imageMember.getImageId());

        String imageUrl = imageService.storeImageMember(imageFile, memberId).getImageUrl();
        Optional.ofNullable(displayName)
                .ifPresent(name -> member.setDisplayName(name));
        member.setImageUrl(imageUrl);
        memberRepository.save(member);
        return MemberDto.Response.from(member, imageUrl);
    }

    public void deleteMember(Long memberId) {

        Member member = findMember(memberId);
        memberRepository.deleteById(memberId);
    }

}