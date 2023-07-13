package com.ftiland.travelrental.member.controller;

import com.ftiland.travelrental.common.annotation.CurrentMemberId;
import com.ftiland.travelrental.common.utils.JwtUtils;
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.dto.MemberPatchDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.oauth.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@Slf4j
@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    @GetMapping
    public ResponseEntity<MemberDto.Response> getMember(@CurrentMemberId Long memberId) {

        if(memberId != null) {
            Member member = memberService.findMember(memberId);
            MemberDto.Response response = MemberDto.Response.from(member);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping
    public ResponseEntity<MemberDto.Response> patchMember(@Valid @RequestBody MemberPatchDto.Request request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long memberId = JwtUtils.extractMemberIdFromAuthentication(authentication);

        if(memberId != null) {
            MemberDto.Response response = memberService.updateMember(request, memberId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long memberId = JwtUtils.extractMemberIdFromAuthentication(authentication);

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}