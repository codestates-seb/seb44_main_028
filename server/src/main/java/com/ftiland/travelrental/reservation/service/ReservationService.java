package com.ftiland.travelrental.reservation.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.service.ProductService;
import com.ftiland.travelrental.reservation.dto.CancelReservation;
import com.ftiland.travelrental.reservation.dto.CreateReservation;
import com.ftiland.travelrental.reservation.dto.ReservationDto;
import com.ftiland.travelrental.reservation.entity.Reservation;
import com.ftiland.travelrental.reservation.repository.ReservationRepository;
import com.ftiland.travelrental.reservation.status.ReservationStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ftiland.travelrental.common.exception.ExceptionCode.*;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MemberService memberService;
    private final ProductService productService;

    @Transactional
    public CreateReservation.Response createReservation(CreateReservation.Request request,
                                                        String productId,
                                                        Long memberId) {
        Member member = memberService.findMember(memberId);
        Product product = productService.findProduct(productId);

        // 제품의 주인이 예약을 요청할 경우
        if (Objects.equals(product.getMember().getMemberId(), member.getMemberId())) {
            throw new BusinessLogicException(RESERVATION_NOT_ALLOWED);
        }

        // 예약 시작날짜가 예약 종료날짜보다 짧을 경우 or 현재 날짜보다 이전인 경우
        if (request.getStartDate().isAfter(request.getEndDate()) || request.getStartDate().isBefore(LocalDate.now())) {
            throw new BusinessLogicException(RESERVATION_NOT_ALLOWED);
        }

        // 예약 날짜가 최소 빌리는 기간보다 짧을 때
        Period period = request.getStartDate().until(request.getEndDate());
        if (product.getMinimumRentalPeriod() > period.getDays() + 1) {
            throw new BusinessLogicException(RESERVATION_NOT_ALLOWED);
        }

        // 예약 날짜가 겹치는 경우
        if (checkReservationDuplication(request.getEndDate(), request.getStartDate())) {
            throw new BusinessLogicException(RESERVATION_NOT_ALLOWED);
        }

        Reservation reservation = Reservation.builder()
                .reservationId(UUID.randomUUID().toString())
                .totalFee(request.getTotalFee())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate().plusDays(1))
                .status(ReservationStatus.REQUESTED)
                .member(member)
                .product(product).build();

        return CreateReservation.Response.from(reservationRepository.save(reservation));
    }

    public boolean checkReservationDuplication(LocalDate startDate, LocalDate endDate) {
        return reservationRepository.existsByStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatusNot(startDate, endDate, ReservationStatus.CANCELED);
    }

    @Transactional
    public CancelReservation.Response cancelReservationByBorrower(String reservationId, Long memberId) {
        Member member = memberService.findMember(memberId);
        Reservation reservation = findReservation(reservationId);

        validateOwner(reservation, member);

        LocalDate date = LocalDate.now().plusDays(7);
        // 예약 시작일 일주일 전부터는 예약취소 불가능
        if (date.isAfter(reservation.getStartDate())) {
            throw new BusinessLogicException(NOT_POSSIBLE_CANCEL);
        }
        reservation.setStatus(ReservationStatus.CANCELED);

        return CancelReservation.Response.from(reservation);
    }

    @Transactional
    public CancelReservation.Response cancelReservationByLender(String reservationId, String productId, Long memberId) {
        Member member = memberService.findMember(memberId);
        Reservation reservation = findReservation(reservationId);

        Product product = productService.findProduct(productId);

        validateOwner(reservation, member, product);

        LocalDate date = LocalDate.now().plusDays(7);
        // 예약 시작일 일주일 전부터는 예약취소 불가능
        if (date.isAfter(reservation.getStartDate())) {
            throw new BusinessLogicException(NOT_POSSIBLE_CANCEL);
        }
        reservation.setStatus(ReservationStatus.CANCELED);

        return CancelReservation.Response.from(reservation);
    }

    public Reservation findReservation(String reservationId) {
        return reservationRepository.findById(reservationId)
                .orElseThrow(() -> new BusinessLogicException(NOT_FOUND_RESERVATION));
    }

    private void validateOwner(Reservation reservation, Member member, Product product) {
        if (!Objects.equals(product.getMember().getMemberId(), member.getMemberId())) {
            throw new BusinessLogicException(UNAUTHORIZED);
        }
        if (!Objects.equals(product.getProductId(), reservation.getProduct().getProductId())) {
            throw new BusinessLogicException(UNAUTHORIZED);
        }
    }

    private void validateOwner(Reservation reservation, Member member) {
        if (!Objects.equals(reservation.getMember().getMemberId(), member.getMemberId())) {
            throw new BusinessLogicException(UNAUTHORIZED);
        }
    }

    public List<ReservationDto> getReservationByBorrower(Long memberId, ReservationStatus status) {
        Member member = memberService.findMember(memberId);

        List<Reservation> reservations = reservationRepository.findAllByMemberMemberIdAndStatus(memberId, status);

        return reservations.stream()
                .map(r -> ReservationDto.from(r))
                .collect(Collectors.toList());
    }
}
