package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.reservation.entity.Reservation;
import com.ftiland.travelrental.reservation.status.ReservationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    private ReservationStatus status;

    public static ReservationDto from(Reservation reservation) {
        return ReservationDto.builder()
                .reservationId(reservation.getReservationId())
                .totalFee(reservation.getTotalFee())
                .username(reservation.getProduct().getMember().getDisplayName())
                .startDate(reservation.getStartDate().toString())
                .endDate(reservation.getEndDate().toString())
                .status(reservation.getStatus()).build();
    }
}
