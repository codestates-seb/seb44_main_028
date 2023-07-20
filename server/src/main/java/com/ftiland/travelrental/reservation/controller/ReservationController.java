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

@Slf4j
@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @PostMapping("/products/{product-id}")
    public ResponseEntity<CreateReservation.Response> createReservation(
            @Valid @RequestBody CreateReservation.Request request,
            @Positive @PathVariable("product-id") String productId,
            @CurrentMember Long memberId) {
        log.info("[ReservationController] createReservation called");

        CreateReservation.Response response = reservationService.createReservation(request, productId, memberId);

        URI uri = URI.create(String.format("/api/reservation/%s", response.getReservationId()));
        return ResponseEntity.created(uri).body(response);
    }

    @PatchMapping("/{reservation-id}/cancel")
    public ResponseEntity<CancelReservation.Response> cancelReservationByBorrower(
            @Positive @PathVariable("reservation-id") String reservationId,
            @CurrentMember Long memberId) {
        log.info("[ReservationController] cancelReservationByBorrower called");

        return ResponseEntity.ok(reservationService.cancelReservationByBorrower(reservationId, memberId));
    }

    @PatchMapping("/{reservation-id}/products/{product-id}/cancel")
    public ResponseEntity<CancelReservation.Response> cancelReservationByLender(
            @Positive @PathVariable("reservation-id") String reservationId,
            @Positive @PathVariable("product-id") String productId,
            @CurrentMember Long memberId) {
        log.info("[ReservationController] cancelReservationByLender called");

        return ResponseEntity.ok(reservationService.cancelReservationByLender(reservationId, productId, memberId));
    }

    @PatchMapping("/{reservation-id}/products/{product-id}/accept")
    public ResponseEntity<AcceptReservation.Response> acceptReservationByLender(
            @Positive @PathVariable("reservation-id") String reservationId,
            @Positive @PathVariable("product-id") String productId,
            @CurrentMember Long memberId) {
        log.info("[ReservationController] acceptReservationByLender called");

        return ResponseEntity.ok(reservationService.acceptReservationByLender(reservationId, productId, memberId));
    }

    @GetMapping
    public ResponseEntity<GetBorrowReservations> getReservationsByBorrower(
            @RequestParam ReservationStatus status,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "0") int page,
            @CurrentMember Long memberId) {
        log.info("[ReservationController] getReservationsByBorrower called");
        long start = System.currentTimeMillis();
        GetBorrowReservations response = reservationService.getReservationByBorrower(memberId, status, size, page);
        long end = System.currentTimeMillis();
        log.info("getReservationByBorrower total time = {}", end - start);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/products/{product-id}")
    public ResponseEntity<GetLendReservations> getReservationsByLender(
            @PathVariable("product-id") String productId,
            @RequestParam ReservationStatus status,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "0") int page,
            @CurrentMember Long memberId) {
        log.info("[ReservationController] getReservationsByLender called");

        return ResponseEntity.ok(reservationService.getReservationByLender(memberId, productId, status, size, page));
    }

    @GetMapping("/products/{product-id}/calendar")
    public ResponseEntity<GetReservationsMonth.Response> getReservationsByMonth(
            @PathVariable("product-id") String productId,
            @RequestParam String date1,
            @RequestParam String date2) {
        log.info("[ReservationController] getReservationsByMonth called");

        return ResponseEntity.ok(reservationService.getReservationsByMonth(productId, date1, date2));
    }

    @GetMapping("/products/{product-id}/moreCalendar")
    public ResponseEntity<List<ReservationCalendarDto>> getReservationsByMoreMonth(
            @PathVariable("product-id") String productId,
            @RequestParam String date) {
        log.info("[ReservationController] getReservationsByMoreMonth called");

        return ResponseEntity.ok(reservationService.getReservationByMonth(productId, date));
    }

    @PostMapping("/{reservation-id}/rate")
    public ResponseEntity<Void> rateReservation(
            @Valid @RequestBody RateReservation.Request request,
            @Positive @PathVariable("reservation-id") String reservationId,
            @CurrentMember Long memberId) {
        log.info("[ReservationController] getReservationsByMoreMonth called");

        reservationService.rateReservation(reservationId, memberId, request.getScore());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/members")
    public ResponseEntity<Long> countAllReservation(@CurrentMember Long memberId) {
        log.info("[ReservationController] countAllReservation called");

        return ResponseEntity.ok(reservationService.countAllReservation(memberId));
    }
}
