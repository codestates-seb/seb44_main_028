package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class AcceptReservation {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private String reservationId;
        private String productId;

        public static Response from(Reservation reservation) {
            return Response.builder()
                    .productId(reservation.getProduct().getProductId())
                    .reservationId(reservation.getReservationId())
                    .build();
        }
    }
}
