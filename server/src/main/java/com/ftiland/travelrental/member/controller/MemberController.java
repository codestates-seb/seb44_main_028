package com.ftiland.travelrental.member.controller;

import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.dto.MemberPatchDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.oauth.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MemberDto.Response> getMember(@RequestHeader("Authorization") String authorizationHeader) {

//        공통 utility로 추출
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String memberId = null;
//
//        if (authentication != null && authentication.getPrincipal() instanceof Map) {
//            Map<String, Object> principalMap = (Map<String, Object>) authentication.getPrincipal();
//            memberId = principalMap.get("memberId").toString();
//        }

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jws = authorizationHeader.substring(7);
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            Integer memberId = (Integer) claims.get("memberId");
            Long memberIdLong = memberId != null ? memberId.longValue() : null;

            Member member = memberService.findMember(memberIdLong);

            MemberDto.Response response = MemberDto.Response.from(member);

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping
    public ResponseEntity<MemberDto.Response> patchMember(@RequestHeader("Authorization") String authorizationHeader,
                                                          @Valid @RequestBody MemberPatchDto.Request request) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jws = authorizationHeader.substring(7);
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
            Integer memberId = (Integer) claims.get("memberId");
            Long memberIdLong = memberId != null ? memberId.longValue() : null;

            MemberDto.Response response = memberService.updateMember(request, memberIdLong);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}