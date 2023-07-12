package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationCalendarDto {

    private String startDate;
    private String endDate;

    public static ReservationCalendarDto from(Reservation reservation) {
        return ReservationCalendarDto.builder()
                .startDate(reservation.getStartDate().toString())
                .endDate(reservation.getEndDate().toString()).build();
    }
}
