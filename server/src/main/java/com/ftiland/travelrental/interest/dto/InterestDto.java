package com.ftiland.travelrental.interest.dto;

import com.ftiland.travelrental.common.PageInfo;
import com.ftiland.travelrental.image.entity.ImageProduct;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

public class InterestDto {
    @Getter
    @Setter
    public static class PostRequestDto{
        private long memberId;
        private String productId;
    }

    @Getter
    @Setter
    public static class DeleteRequestDto{
        private long memberId;
        private String interestId;
    }

    @Getter
    @Setter
    public static class PostResponseDto {
        private String interestId;
        private long memberId;
        private String productId;
    }

    @Getter
    @Setter
    public static class GetResponseDto {
        private String interestId;
        private String productId;
        private String title;
        private String content;
        private String address;
        private Integer minimumRentalPeriod;
        private Integer baseFee;
        private Integer feePerDay;
        private String imageUrl;

     }

    @Getter
    @Setter
    public static class ResponsesDto{
        private PageInfo pageInfo;
        private ArrayList<GetResponseDto> responses = new ArrayList<>();
        public void addResponse(GetResponseDto responseDto){
            this.responses.add(responseDto);
        }
    }
    @Getter
    @Setter
    public static class Responses2Dto{
        private ArrayList<GetResponseDto> responses = new ArrayList<>();
        public void addResponse(GetResponseDto responseDto){
            this.responses.add(responseDto);
        }
    }
}
