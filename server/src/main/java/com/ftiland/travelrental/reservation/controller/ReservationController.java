package com.ftiland.travelrental.reservation.controller;

import com.ftiland.travelrental.common.annotation.CurrentMember;
import com.ftiland.travelrental.reservation.dto.*;
import com.ftiland.travelrental.reservation.service.ReservationService;
import com.ftiland.travelrental.reservation.status.ReservationStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/products/{product-id}")
    public ResponseEntity<?> createReservation(@Valid @RequestBody CreateReservation.Request request,
                                               @Positive @PathVariable("product-id") String productId,
                                               @CurrentMember Long memberId) {

        CreateReservation.Response response = reservationService.createReservation(request, productId, memberId);

        URI uri = URI.create(String.format("/api/reservation/%s", response.getReservationId()));
        return ResponseEntity.created(uri).body(response);
    }

    @PatchMapping("/{reservation-id}/cancel")
    public ResponseEntity<?> cancelReservationByBorrower(@Positive @PathVariable("reservation-id") String reservationId,
                                                         @CurrentMember Long memberId) {

        return ResponseEntity.ok(reservationService.cancelReservationByBorrower(reservationId, memberId));
    }

    @PatchMapping("/{reservation-id}/products/{product-id}/cancel")
    public ResponseEntity<?> cancelReservationByLender(@Positive @PathVariable("reservation-id") String reservationId,
                                                       @Positive @PathVariable("product-id") String productId,
                                                       @CurrentMember Long memberId) {

        return ResponseEntity.ok(reservationService.cancelReservationByLender(reservationId, productId, memberId));
    }

    @PatchMapping("/{reservation-id}/products/{product-id}/accept")
    public ResponseEntity<?> acceptReservationByLender(@Positive @PathVariable("reservation-id") String reservationId,
                                                       @Positive @PathVariable("product-id") String productId,
                                                       @CurrentMember Long memberId) {
        return ResponseEntity.ok(reservationService.acceptReservationByLender(reservationId, productId, memberId));
    }

    @GetMapping
    public ResponseEntity<?> getReservationsByBorrower(@RequestParam ReservationStatus status,
                                                       @RequestParam(defaultValue = "20") int size,
                                                       @RequestParam(defaultValue = "0") int page,
                                                       @CurrentMember Long memberId) {
        GetBorrowReservations response = reservationService.getReservationByBorrower(memberId, status, size, page);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/{product-id}")
    public ResponseEntity<?> getReservationsByLender(@PathVariable("product-id") String productId,
                                                     @RequestParam ReservationStatus status,
                                                     @RequestParam(defaultValue = "20") int size,
                                                     @RequestParam(defaultValue = "0") int page,
                                                     @CurrentMember Long memberId) {

        return ResponseEntity.ok(reservationService.getReservationByLender(memberId, productId, status, size, page));
    }

    @GetMapping("/products/{product-id}/calendar")
    public ResponseEntity<?> getReservationsByMonth(@PathVariable("product-id") String productId,
                                                    @RequestParam String date1,
                                                    @RequestParam String date2) {

        return ResponseEntity.ok(reservationService.getReservationsByMonth(productId, date1, date2));
    }

    @GetMapping("/products/{product-id}/moreCalendar")
    public ResponseEntity<?> getReservationsByMoreMonth(@PathVariable("product-id") String productId,
                                                        @RequestParam String date) {

        return ResponseEntity.ok(reservationService.getReservationByMonth(productId, date));
    }

    @PostMapping("/{reservation-id}/rate")
    public ResponseEntity<?> rateReservation(@Valid @RequestBody RateReservation.Request request,
                                             @Positive @PathVariable("reservation-id") String reservationId,
                                             @CurrentMember Long memberId) {

        reservationService.rateReservation(reservationId, memberId, request.getScore());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/members")
    public ResponseEntity<?> countAllReservation(@CurrentMember Long memberId) {

        return ResponseEntity.ok(reservationService.countAllReservation(memberId));
    }
}
