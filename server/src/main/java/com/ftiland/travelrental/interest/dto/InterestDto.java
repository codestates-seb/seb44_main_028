package com.ftiland.travelrental.interest.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class InterestDto {
    @Getter
    @Setter
    public static class ResponseDto{
        private String interestId;
        private Long memberId;
        private String productId;
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
