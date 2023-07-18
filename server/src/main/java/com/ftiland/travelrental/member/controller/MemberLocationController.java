package com.ftiland.travelrental.member.controller;

import com.ftiland.travelrental.common.annotation.CurrentMember;
import com.ftiland.travelrental.member.dto.MemberDto;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members/location")
public class MemberLocationController {

    private MemberLocationService memberLocationService;

    @Autowired
    public MemberLocationController(MemberLocationService memberLocationService) {
        this.memberLocationService = memberLocationService;
    }

    // 위치 갱신
    @PatchMapping
    public ResponseEntity updateLocation(@CurrentMember Long memberId, @Param("latitude") double latitude, @Param("longitude") double longitude) {
        Member member = memberLocationService.updateLocation(memberId, latitude, longitude);
        MemberDto.Response response = MemberDto.Response.from(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }
}
