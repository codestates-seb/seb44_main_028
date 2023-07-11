package com.ftiland.travelrental.interest.dto;

import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.product.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class InterestDto {
    @Getter
    @Setter
    public static class ResponseDto{
        private String interestId;
        private Member member;
        private Product product;
    }

    @Getter
    @Setter
    public static class ResponsesDto{
        private ArrayList<ResponseDto> responses = new ArrayList<>();
        public void addResponse(ResponseDto responseDto){
            this.responses.add(responseDto);
        }
    }
}
