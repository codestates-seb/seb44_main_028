package com.ftiland.travelrental.oauth.auth.controller;

import com.ftiland.travelrental.member.dto.GetMember;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/members")
@RestController
@RequiredArgsConstructor
public class authController {
    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<GetMember.Response> getMember() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(principal.toString());
        Long memberId = 1L;

        Member member = memberService.findMember(memberId);

        GetMember.Response response = GetMember.Response.from(member);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
