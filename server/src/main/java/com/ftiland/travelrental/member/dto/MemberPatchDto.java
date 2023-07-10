package com.ftiland.travelrental.member.dto;

import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class MemberPatchDto {
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Request {
        private String displayName;
        private Double latitude;
        private Double longitude;
    }
}

