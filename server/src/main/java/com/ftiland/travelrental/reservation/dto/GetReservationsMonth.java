package com.ftiland.travelrental.reservation.dto;

import com.ftiland.travelrental.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public class GetReservationsMonth {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Request {
        @NotNull
        private Integer totalFee;
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

        private String productTitle;
        private int baseFee;
        private int feePerDay;
        private int minimumRentalPeriod;

        private List<ReservationCalendarDto> reservationsDate1;
        private List<ReservationCalendarDto> reservationsDate2;

        public static Response from(Product product,
                                    List<ReservationCalendarDto> reservationsDate1,
                                    List<ReservationCalendarDto> reservationsDate2) {

            return Response.builder()
                    .productTitle(product.getTitle())
                    .baseFee(product.getBaseFee())
                    .feePerDay(product.getFeePerDay())
                    .minimumRentalPeriod(product.getMinimumRentalPeriod())
                    .reservationsDate1(reservationsDate1)
                    .reservationsDate2(reservationsDate2)
                    .build();
        }
    }
}
