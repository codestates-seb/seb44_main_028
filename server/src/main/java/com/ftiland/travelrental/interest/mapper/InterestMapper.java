package com.ftiland.travelrental.interest.mapper;

import com.ftiland.travelrental.image.entity.ImageProduct;
import com.ftiland.travelrental.image.service.ImageService;
import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.product.entity.Product;
import org.mapstruct.Mapper;



import java.util.ArrayList;

@Mapper(componentModel = "spring")
public interface InterestMapper {
    default InterestDto.PostResponseDto interestToPostResponseDto(Interest interest){
        InterestDto.PostResponseDto response = new InterestDto.PostResponseDto();

        response.setInterestId(interest.getInterestId());
        response.setMemberId(interest.getMember().getMemberId());
        response.setProductId(interest.getProduct().getProductId());


        return response;
    }

    default InterestDto.GetResponseDto interestToGetResponseDto(Interest interest){
        InterestDto.GetResponseDto response = new InterestDto.GetResponseDto();
        Product product = interest.getProduct();
        response.setInterestId(interest.getInterestId());
        response.setProductId(product.getProductId());
        response.setTitle(product.getTitle());
        response.setContent(product.getContent());
        response.setAddress(product.getAddress());
        response.setMinimumRentalPeriod(product.getMinimumRentalPeriod());
        response.setBaseFee(product.getBaseFee());
        response.setFeePerDay(product.getFeePerDay());


        return response;
    }

    default InterestDto.ResponsesDto interestsToResponsesDto (ImageService imageService,ArrayList<Interest> interests,long page,long size,int listSize){
        InterestDto.ResponsesDto responses = new InterestDto.ResponsesDto();
        for(Interest interest : interests){
            InterestDto.GetResponseDto response = interestToGetResponseDto(interest);
            ArrayList<ImageProduct> images = imageService.findImageProduct(interest.getProduct().getProductId());

            // response 에 image 추가
            for(ImageProduct image : images){
                response.addImageProduct(image.getImageUrl());
            }
            responses.addResponse(response);
        }
        responses.setListSize(listSize);
        responses.setPage(page);
        responses.setSize(size);
        return responses;
    }
}