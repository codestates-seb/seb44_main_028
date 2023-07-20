package com.ftiland.travelrental.member.dto;

import com.ftiland.travelrental.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private Long memberId;
        private String email;
        private String displayName;
        private String imageUrl;
        private String address;
        private Double latitude;
        private Double longitude;

        public static MemberDto.Response from(Member member, String imageUrl) {
            return Response.builder()
                    .memberId(member.getMemberId())
                    .email(member.getEmail())
                    .address(member.getAddress())
                    .displayName(member.getDisplayName())
                    .longitude(member.getLongitude())
                    .latitude(member.getLatitude())
                    .imageUrl(imageUrl)
                    .build();
        }

        public static MemberDto.Response from(Member member) {
            return Response.builder()
                    .memberId(member.getMemberId())
                    .email(member.getEmail())
                    .address(member.getAddress())
                    .displayName(member.getDisplayName())
                    .longitude(member.getLongitude())
                    .latitude(member.getLatitude())
                    .imageUrl(member.getImageUrl())
                    .build();
        }
    }
}

