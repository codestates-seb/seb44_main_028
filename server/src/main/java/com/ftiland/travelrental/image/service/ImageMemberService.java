package com.ftiland.travelrental.image.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.repository.ImageMemberRepository;
import com.ftiland.travelrental.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ImageMemberService {

    private final ImageMemberRepository imageMemberRepository;

    public ImageMember findImageMember(Long memberId){
        return imageMemberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_IMAGE_MEMBER));
    }

    public String findImageFileName(Long memberId) {
        ImageMember imageMember = findImageMember(memberId);

        return imageMember.getFileName();
    }

    @Transactional
    public void createImageMember(Member member, ImageDto imageDto) {

        ImageMember image = new ImageMember(
                UUID.randomUUID().toString(),
                imageDto.getFileName(),
                imageDto.getImageUrl(),
                imageDto.getFileType(),
                member);

        imageMemberRepository.save(image);
    }

    @Transactional
    public void deleteImageMember(Member member) {
        ImageMember imageMember = findImageMember(member.getMemberId());

        imageMemberRepository.delete(imageMember);
    }
}
