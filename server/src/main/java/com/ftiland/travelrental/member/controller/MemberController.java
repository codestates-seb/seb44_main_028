package com.ftiland.travelrental.member.controller;

import com.ftiland.travelrental.common.utils.MemberAuthUtils;
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.dto.MemberPatchDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.repository.query.Param;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Slf4j
@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @Autowired
    private HttpServletRequest request;

    @GetMapping
    public ResponseEntity<MemberDto.Response> getMember() {
        Long memberId = MemberAuthUtils.getMemberId(request);

        Member member = memberService.findMember(memberId);
        MemberDto.Response response = MemberDto.Response.from(member);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<MemberDto.Response> patchMember(@Valid @RequestBody MemberPatchDto.Request patchRequest) {

        Long memberId = MemberAuthUtils.getMemberId(request);

        MemberDto.Response response = memberService.updateMember(patchRequest, memberId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<MemberDto.Response> patchMember(@RequestHeader("Authorization") String authorizationHeader,
                                                          @Param("displayName") String displayName, @Param("imageFile")MultipartFile imageFile) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jws = authorizationHeader.substring(7);
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            Integer memberId = (Integer) claims.get("memberId");
            Long memberIdLong = memberId != null ? memberId.longValue() : null;

            MemberDto.Response response = memberService.updateMember(displayName,imageFile, memberIdLong);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }                                         @Param("displayName") String displayName, @Param("imageFile")MultipartFile imageFile) {

      
    @DeleteMapping
    public ResponseEntity<Void> deleteMember() {


        Long memberId = MemberAuthUtils.getMemberId(request);
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}