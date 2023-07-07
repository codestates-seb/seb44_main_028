package com.ftiland.travelrental.reservation.controller;

import com.ftiland.travelrental.reservation.dto.CreateReservation;
import com.ftiland.travelrental.reservation.dto.CancelReservation;
import com.ftiland.travelrental.reservation.dto.ReservationDto;
import com.ftiland.travelrental.reservation.service.ReservationService;
import com.ftiland.travelrental.reservation.status.ReservationStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.time.LocalDate;
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

    @PatchMapping("/{reservation-id}")
    public ResponseEntity<CancelReservation.Response> cancelReservationByBorrower(
            @Positive @PathVariable("reservation-id") String reservationId) {
        log.info("[ReservationController] cancelReservationByBorrower called");
        Long memberId = 2L;

        return ResponseEntity.ok(reservationService.cancelReservationByBorrower(reservationId, memberId));
    }

    @PatchMapping("/{reservation-id}/products/{product-id}")
    public ResponseEntity<CancelReservation.Response> cancelReservationByLender(
            @Positive @PathVariable("reservation-id") String reservationId,
            @Positive @PathVariable("product-id") String productId) {
        log.info("[ReservationController] cancelReservationByLender called");

        Long memberId = 1L;

        return ResponseEntity.ok(reservationService.cancelReservationByLender(reservationId, productId, memberId));
    }

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getReservationByBorrower(
            @RequestParam  ReservationStatus status) {
        log.info("[ReservationController] getReservationByBorrower called");

        Long memberId = 2L;

        return ResponseEntity.ok(reservationService.getReservationByBorrower(memberId, status));
    }
}
