package com.ftiland.travelrental.reservation.repository;

import com.ftiland.travelrental.reservation.dto.BorrowReservationDto;
import com.ftiland.travelrental.reservation.dto.LendReservationDto;
import com.ftiland.travelrental.reservation.entity.Reservation;
import com.ftiland.travelrental.reservation.status.ReservationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {
    boolean existsByStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatusNotAndProductProductId(LocalDate endDate,
                                                                                                    LocalDate startDate,
                                                                                                    ReservationStatus status,
                                                                                                    String productId);

    List<Reservation> findReservationByStatus(ReservationStatus status);

    @Query("SELECT r " +
            "FROM Reservation r " +
            "WHERE r.product.productId = :productId AND r.status != :status " +
            "AND r.startDate <= :endDate AND r.endDate >= :startDate")
    List<Reservation> findReservationByDate(@Param("productId") String productId, @Param("status") ReservationStatus status,
                                            @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("SELECT new com.ftiland.travelrental.reservation.dto.LendReservationDto(r.reservationId, im.imageUrl, m.displayName, r.startDate, r.endDate, r.status) " +
            "FROM Reservation r JOIN r.member m " +
            "JOIN ImageMember im on im.member.memberId = m.memberId " +
            "WHERE r.product.productId = :productId AND r.status = :status " +
            "GROUP BY r.reservationId")
    Page<LendReservationDto> findLendReservationDtosByProductId(@Param("productId") String productId,
                                                                @Param("status") ReservationStatus status,
                                                                Pageable pageable);

    /*@Query("SELECT new com.ftiland.travelrental.reservation.dto.BorrowReservationDto(r.reservationId, ip.imageUrl, p.title, r.startDate, r.endDate, r.status) " +
            "FROM Reservation r JOIN r.product p " +
            "JOIN ImageProduct ip on ip.product.productId = p.productId " +
            "WHERE r.member.memberId = :memberId AND r.status = :status " +
            "GROUP BY r.reservationId")
    Page<BorrowReservationDto> findBorrowReservationDtosByMemberId(@Param("memberId") Long memberId,
                                                                   @Param("status") ReservationStatus status,
                                                                   Pageable pageable);*/

    @Query("SELECT new com.ftiland.travelrental.reservation.dto.BorrowReservationDto(r.reservationId, p.mainImage, p.title, r.startDate, r.endDate, r.status) " +
            "FROM Reservation r JOIN r.product p " +
            "WHERE r.member.memberId = :memberId AND r.status = :status " +
            "GROUP BY r.reservationId")
    Page<BorrowReservationDto> findBorrowReservationDtosByMemberId(@Param("memberId") Long memberId,
                                                                   @Param("status") ReservationStatus status,
                                                                   Pageable pageable);

    long countByMemberMemberId(Long memberId);

    long countByProductProductId(String productId);
}