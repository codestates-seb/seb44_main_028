package com.ftiland.travelrental.member.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
<<<<<<< HEAD
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.repository.ImageMemberRepository;
=======
import com.ftiland.travelrental.image.service.ImageService;
>>>>>>> 94a6125 (:sparkle: 이미지 추가)
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.dto.MemberPatchDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.repository.MemberRepository;
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
=======
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> 94a6125 (:sparkle: 이미지 추가)
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static com.ftiland.travelrental.common.exception.ExceptionCode.MEMBER_NOT_FOUND;

@Service
public class MemberService {
<<<<<<< HEAD

    @Value("image.default.path")
    private String defaultImageUrl;

    private final MemberRepository memberRepository;
    private final ImageMemberRepository imageMemberRepository;

    public MemberService(MemberRepository memberRepository, ImageMemberRepository imageMemberRepository) {
        this.memberRepository = memberRepository;
        this.imageMemberRepository = imageMemberRepository;
    }

    public void createMembers(List<Member> members){
        members.forEach(member -> createMember(member));
=======
    private final MemberRepository memberRepository;
    private final ImageService imageService;

    @Autowired
    public MemberService(MemberRepository memberRepository,ImageService imageService) {
        this.memberRepository = memberRepository;
        this.imageService = imageService;
>>>>>>> 94a6125 (:sparkle: 이미지 추가)
    }

    public Member createMember(Member member) {
        if(!existsEmail(member.getEmail())) {
            Member savedMember = memberRepository.save(member);
            ImageMember imageMember = new ImageMember();
            imageMember.setImageUrl(defaultImageUrl);
            imageMember.setMember(savedMember);
            imageMemberRepository.save(imageMember);
            return savedMember;
        }

        return null;
    }

    public boolean existsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }

    public Member findMember(Long memberId){
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
    }

    public Member findMemberByEmail(String email){
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
    }

    public MemberDto.Response updateMember(String displayName, MultipartFile imageFile ,Long memberId) {

<<<<<<< HEAD
        Member member = findMember(memberId);

        Optional.ofNullable(request.getDisplayName())
                .ifPresent(displayName -> member.setDisplayName(displayName));

        memberRepository.save(member);

        return MemberDto.Response.from(member);
=======
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(MEMBER_NOT_FOUND));
        String imageUrl = imageService.storeImageMember(imageFile,memberId).getImageUrl();
        Optional.ofNullable(displayName)
                .ifPresent(name -> member.setDisplayName(name));

        return MemberDto.Response.from(member,imageUrl);
>>>>>>> 94a6125 (:sparkle: 이미지 추가)
    }



    public void deleteMember(Long memberId) {
        Member member = findMember(memberId);

        memberRepository.deleteById(memberId);
    }

}
