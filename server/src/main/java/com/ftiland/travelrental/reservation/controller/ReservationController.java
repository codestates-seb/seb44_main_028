package com.ftiland.travelrental.reservation.controller;

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
            @Positive @PathVariable("product-id") String productId) {
        log.info("[ReservationController] createReservation called");
        Long memberId = 2L;

        CreateReservation.Response response = reservationService.createReservation(request, productId, memberId);

        URI uri = URI.create(String.format("/api/reservation/%s", response.getReservationId()));
        return ResponseEntity.created(uri).body(response);
    }

    @PatchMapping("/{reservation-id}/cancel")
    public ResponseEntity<CancelReservation.Response> cancelReservationByBorrower(
            @Positive @PathVariable("reservation-id") String reservationId) {
        log.info("[ReservationController] cancelReservationByBorrower called");
        Long memberId = 2L;

        return ResponseEntity.ok(reservationService.cancelReservationByBorrower(reservationId, memberId));
    }

    @PatchMapping("/{reservation-id}/products/{product-id}/cancel")
    public ResponseEntity<CancelReservation.Response> cancelReservationByLender(
            @Positive @PathVariable("reservation-id") String reservationId,
            @Positive @PathVariable("product-id") String productId) {
        log.info("[ReservationController] cancelReservationByLender called");

        Long memberId = 1L;

        return ResponseEntity.ok(reservationService.cancelReservationByLender(reservationId, productId, memberId));
    }

    @PatchMapping("/{reservation-id}/products/{product-id}/accept")
    public ResponseEntity<AcceptReservation.Response> acceptReservationByLender(
            @Positive @PathVariable("reservation-id") String reservationId,
            @Positive @PathVariable("product-id") String productId) {
        log.info("[ReservationController] acceptReservationByLender called");

        Long memberId = 1L;

        return ResponseEntity.ok(reservationService.acceptReservationByLender(reservationId, productId, memberId));
    }

    @GetMapping
    public ResponseEntity<GetReservations> getReservationsByBorrower(
            @RequestParam ReservationStatus status,
            @RequestParam int size,
            @RequestParam int page) {
        log.info("[ReservationController] getReservationsByBorrower called");

        Long memberId = 2L;

        return ResponseEntity.ok(reservationService.getReservationByBorrower(memberId, status, size, page));
    }

    @GetMapping("/products/{product-id}")
    public ResponseEntity<GetReservations> getReservationsByLender(
            @PathVariable("product-id") String productId,
            @RequestParam ReservationStatus status,
            @RequestParam int size,
            @RequestParam int page) {
        log.info("[ReservationController] getReservationsByLender called");

        Long memberId = 2L;

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

        Long memberId = 2L;

        return ResponseEntity.ok(reservationService.getReservationByMonth(productId, date));
    }

    @PatchMapping("/{reservation-id}/rate")
    public ResponseEntity<Void> rateReservation(
            @RequestParam int score,
            @Positive @PathVariable("reservation-id") String reservationId) {
        log.info("[ReservationController] getReservationsByMoreMonth called");

        Long memberId = 2L;

        reservationService.rateReservation(reservationId, memberId, score);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
