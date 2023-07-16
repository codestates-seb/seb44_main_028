package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.common.PageInfo;
import com.ftiland.travelrental.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetMemberReservations {
    private List<MemberReservationDto> reservations;
    private PageInfo pageInfo;


    public static GetMemberReservations from(Page<Reservation> reservations) {
        List<MemberReservationDto> reservationDtos = reservations.getContent().stream()
                .map(MemberReservationDto::from)
                .collect(Collectors.toList());

        PageInfo pageInfo = new PageInfo(reservations.getNumber(), reservations.getSize(),
                reservations.getTotalElements(), reservations.getTotalPages());

        return GetMemberReservations.builder()
                .reservations(reservationDtos)
                .pageInfo(pageInfo).build();
    }
}
