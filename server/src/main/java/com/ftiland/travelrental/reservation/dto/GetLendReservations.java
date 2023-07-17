package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.common.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetLendReservations {
    private List<LendReservationDto> reservations;
    private PageInfo pageInfo;


    public static GetLendReservations from(Page<LendReservationDto> reservations) {
        PageInfo pageInfo = new PageInfo(reservations.getNumber(), reservations.getSize(),
                reservations.getTotalElements(), reservations.getTotalPages());

        return GetLendReservations.builder()
                .reservations(reservations.getContent())
                .pageInfo(pageInfo).build();
    }
}
