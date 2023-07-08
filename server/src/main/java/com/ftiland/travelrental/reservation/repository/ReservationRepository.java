package com.ftiland.travelrental.reservation.repository;

import com.ftiland.travelrental.reservation.entity.Reservation;
import com.ftiland.travelrental.reservation.status.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
    boolean existsByStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatusNot(LocalDate endDate, LocalDate startDate, ReservationStatus status);
    List<Reservation> findAllByMemberMemberIdAndStatus(Long memberId, ReservationStatus status);
}
