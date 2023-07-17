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
public class GetBorrowReservations {
    private List<BorrowReservationDto> reservations;
    private PageInfo pageInfo;


    public static GetBorrowReservations from(Page<BorrowReservationDto> reservations) {
        PageInfo pageInfo = new PageInfo(reservations.getNumber(), reservations.getSize(),
                reservations.getTotalElements(), reservations.getTotalPages());

        return GetBorrowReservations.builder()
                .reservations(reservations.getContent())
                .pageInfo(pageInfo).build();
    }
}
