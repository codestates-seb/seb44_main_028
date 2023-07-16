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
public class MemberReservationDto {

    private String reservationId;
    private String image;
    private String title;

    private String startDate;
    private String endDate;
    private ReservationStatus status;

    public static MemberReservationDto from(Reservation reservation) {
        return MemberReservationDto.builder()
                .reservationId(reservation.getReservationId())
                .image(reservation.getProduct().getMember().getDisplayName())
                .startDate(reservation.getStartDate().toString())
                .endDate(reservation.getEndDate().toString())
                .status(reservation.getStatus()).build();
    }
}
