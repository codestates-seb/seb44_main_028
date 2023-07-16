package com.ftiland.travelrental.reservation.repository;

import com.ftiland.travelrental.product.dto.ProductDto;
import com.ftiland.travelrental.reservation.dto.MemberReservationDto;
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
    boolean existsByStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatusNot(LocalDate endDate, LocalDate startDate, ReservationStatus status);
    Page<Reservation> findAllByMemberMemberIdAndStatus(Long memberId, ReservationStatus status, Pageable pageable);

    Page<Reservation> findAllByProductProductIdAndStatus(String productId, ReservationStatus status, Pageable pageable);

    @Query("SELECT r " +
            "FROM Reservation r " +
            "WHERE r.product.productId = :productId AND r.status != :status " +
            "AND r.startDate <= :endDate AND r.endDate >= :startDate")
    List<Reservation> findReservationByDate(@Param("productId") String productId, @Param("status") ReservationStatus status,
                                            @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    /*@Query("SELECT new com.ftiland.travelrental.reservation.dto.MemberReservationDto(r.reservationId, pro) " +
            "FROM Reservation r JOIN r.product p " +
            "JOIN ImageProduct ip" +
            "WHERE p.member.memberId = :memberId " +
            "GROUP BY p.productId")
    Page<MemberReservationDto> findProductDtosByMemberId(@Param("memberId") Long memberId, Pageable pageable);
*/

    long countByMemberMemberId(Long memberId);

    long countByProductProductId(String productId);

}
