package com.ftiland.travelrental.image.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class ImageDto {
    private String fileName;
    private String imageUrl;
    private String fileType;


    @Getter
    @Setter
    public static class ResponseForMember{
        private String imageId;
        private String fileName;
        private String imageUrl;
        private String fileType;
        private Long memberId;
    }

    @Getter
    @Setter
    public static class ResponseForProduct{
        private String imageId;
        private String fileName;
        private String imageUrl;
        private String fileType;
        private String productId;
    }

    @Getter
    @Setter
    public static class ResponseList{
        private List<ResponseForProduct> responseList = new ArrayList<>();

        public void addResponse(ResponseForProduct response){
            this.responseList.add(response);
        }
    }
}
