package com.ftiland.travelrental.member.controller;

import com.ftiland.travelrental.common.annotation.CurrentMember;
import com.ftiland.travelrental.common.utils.MemberAuthUtils;
import com.ftiland.travelrental.image.dto.ImageDto;
import com.ftiland.travelrental.image.entity.ImageMember;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


@Slf4j
@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final ImageService imageService;

    @GetMapping
    public ResponseEntity<MemberDto.Response> getMember(@CurrentMember Long memberId) {
        return ResponseEntity.ok(memberService.findMemberDto(memberId));
    }

    @PatchMapping
    public ResponseEntity<MemberDto.Response> patchMember(@CurrentMember Long memberId,
                                                          @RequestParam("displayName") String displayName,
                                                          @RequestParam("imageFile") MultipartFile imageFile) {

        ImageDto imageDto = imageService.storeImage(imageFile);

        MemberDto.Response response = memberService.updateMember(displayName, imageDto, memberId);

        if (response.isDeleteCheck()) {
            imageService.deleteImage(response.getImageUrl());
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember(@CurrentMember Long memberId) {

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/default")
    public ResponseEntity<ImageDto> createImage(@RequestParam MultipartFile imageFile) {
        ImageDto imageDto = imageService.storeImage(imageFile);
        log.info("[MemberController] createImage : {}", imageDto.getImageUrl());

        return ResponseEntity.ok(imageDto);
    }
}