package com.ftiland.travelrental.interest.mapper;

import com.ftiland.travelrental.common.PageInfo;
import com.ftiland.travelrental.interest.dto.InterestDto;
import com.ftiland.travelrental.interest.entity.Interest;
import com.ftiland.travelrental.product.entity.Product;
import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;

import java.util.ArrayList;

@Mapper(componentModel = "spring")
public interface InterestMapper {
    default InterestDto.PostResponseDto interestToPostResponseDto(Interest interest) {
        InterestDto.PostResponseDto response = new InterestDto.PostResponseDto();

        response.setInterestId(interest.getInterestId());
        response.setMemberId(interest.getMember().getMemberId());
        response.setProductId(interest.getProduct().getProductId());

        return response;
    }

    default InterestDto.GetResponseDto interestToGetResponseDto(Interest interest) {
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

    default InterestDto.ResponsesDto interestsToResponsesDto(Page<Interest> interests) {
        InterestDto.ResponsesDto responses = new InterestDto.ResponsesDto();
        PageInfo pageInfo = new PageInfo(
                interests.getPageable().getPageNumber(),
                interests.getPageable().getPageSize(),
                interests.getTotalElements(),
                interests.getTotalPages()
        );

        for (Interest interest : interests.getContent()) {
            InterestDto.GetResponseDto response = interestToGetResponseDto(interest);
            //ImageProduct image = imageService.findMainImageProduct(interest.getProduct().getProductId());

            // response 에 image 추가
            response.setImageUrl(interest.getProduct().getMainImage());
            responses.addResponse(response);
        }
        responses.setPageInfo(pageInfo);
        return responses;
    }

    default InterestDto.Responses2Dto interestsToResponses2Dto(ArrayList<Interest> interests) {
        InterestDto.Responses2Dto responses = new InterestDto.Responses2Dto();

        for (Interest interest : interests) {
            InterestDto.GetResponseDto response = interestToGetResponseDto(interest);
            //ImageProduct image = imageService.findMainImageProduct(interest.getProduct().getProductId());

            // response 에 image 추가
            response.setImageUrl(interest.getProduct().getMainImage());
            responses.addResponse(response);
        }

        return responses;
    }
}