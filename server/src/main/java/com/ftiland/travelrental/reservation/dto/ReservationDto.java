package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDto {

    private String reservationId;
    private Integer totalFee;
    private String username;

    private String startDate;
    private String endDate;

    public static ReservationDto from(Reservation reservation) {
        return ReservationDto.builder()
                .reservationId(reservation.getReservationId())
                .totalFee(reservation.getTotalFee())
                .username(reservation.getProduct().getMember().getDisplayName())
                .startDate(reservation.getStartDate().toString())
                .endDate(reservation.getEndDate().toString()).build();
    }
}
