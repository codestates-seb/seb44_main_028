package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.reservation.entity.Reservation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class CreateReservation {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotNull
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate startDate;
        @NotNull
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        private LocalDate endDate;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response {

        private String reservationId;
        private String productId;

        public static Response from(Reservation reservation) {
            return Response.builder()
                    .reservationId(reservation.getReservationId())
                    .productId(reservation.getProduct().getProductId())
                    .build();
        }
    }
}
