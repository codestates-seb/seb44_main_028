package com.ftiland.travelrental.reservation.service;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.utils.mail.MailService;
import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.product.entity.Product;
import com.ftiland.travelrental.product.service.ProductService;
import com.ftiland.travelrental.reservation.dto.*;
import com.ftiland.travelrental.reservation.entity.Reservation;
import com.ftiland.travelrental.reservation.repository.ReservationRepository;
import com.ftiland.travelrental.reservation.status.ReservationStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.ftiland.travelrental.common.exception.ExceptionCode.*;
import static com.ftiland.travelrental.reservation.status.ReservationStatus.*;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final MemberService memberService;
    private final ProductService productService;
    private final MailService mailService;

    @Scheduled(cron = "0 0 0 * * *")
    public void setInuse(){
        reservationRepository.findReservationByStatus(RESERVED).stream()
                .filter(r -> r.getStartDate().isAfter(LocalDate.now().minusDays(1)))
                .forEach(r -> r.setStatus(INUSE));
    }

    @Scheduled(cron = "0 1 0 * * *")
    public void setCompleted(){
        reservationRepository.findReservationByStatus(INUSE).stream()
                .filter(r -> r.getEndDate().isBefore(LocalDate.now()))
                .forEach(r -> r.setStatus(COMPLETED));
    }

    @Transactional
    public CreateReservation.Response createReservation(CreateReservation.Request request,
                                                        String productId,
                                                        Long memberId) {
        Member member = memberService.findMember(memberId);
        Product product = productService.findProduct(productId);

        int period = validateReservation(request, productId, member, product);

        // 비용계산
        int overDays = period - product.getMinimumRentalPeriod();
        int totalFee = product.getBaseFee() + overDays * product.getFeePerDay();

        Reservation reservation = Reservation.builder()
                .reservationId(UUID.randomUUID().toString())
                .totalFee(totalFee)
                .startDate(request.getStartDate())
                .endDate(request.getEndDate().plusDays(1))
                .status(ReservationStatus.REQUESTED)
                .member(member)
                .product(product).build();

        Reservation savedReservation = reservationRepository.save(reservation);

        mailService.sendMail(product.getMember().getEmail(), member.getDisplayName(), product.getTitle());

        return CreateReservation.Response.from(savedReservation);
    }

    private int validateReservation(CreateReservation.Request request, String productId, Member member, Product product) {
        // 제품의 주인이 예약을 요청할 경우
        if (Objects.equals(product.getMember().getMemberId(), member.getMemberId())) {
            throw new BusinessLogicException(RESERVATION_NOT_ALLOWED);
        }

        // 예약 시작날짜가 예약 종료날짜보다 짧을 경우 or 현재 날짜보다 이전인 경우
        if (request.getStartDate().isAfter(request.getEndDate()) || request.getStartDate().isBefore(LocalDate.now())) {
            throw new BusinessLogicException(WRONG_RESERVATION);
        }

        // 예약 날짜가 최소 빌리는 기간보다 짧을 때
        Period period = request.getStartDate().until(request.getEndDate());
        if (product.getMinimumRentalPeriod() > period.getDays() + 1) {
            throw new BusinessLogicException(WRONG_MINIMUM_PERIOD);
        }

        // 예약 날짜가 겹치는 경우
        if (checkReservationDuplication(productId, request.getEndDate().plusDays(1), request.getStartDate())) {
            throw new BusinessLogicException(EXIST_RESERVATION);
        }
        return period.getDays() + 1;
    }

    public boolean checkReservationDuplication(String productId, LocalDate startDate, LocalDate endDate) {
        return reservationRepository.existsByStartDateLessThanEqualAndEndDateGreaterThanEqualAndStatusNotAndProductProductId(startDate, endDate, CANCELED, productId);
    }

    @Transactional
    public CancelReservation.Response cancelReservationByBorrower(String reservationId, Long memberId) {
        Member member = memberService.findMember(memberId);
        Reservation reservation = findReservation(reservationId);

        validateOwner(reservation, member);

        // 예약상태가 Requested가 아니면 취소 불가능
        if (reservation.getStatus() != ReservationStatus.REQUESTED) {
            throw new BusinessLogicException(NOT_POSSIBLE_CANCEL);
        }

        reservation.setStatus(CANCELED);

        return CancelReservation.Response.from(reservation);
    }

    @Transactional
    public AcceptReservation.Response acceptReservationByLender(String reservationId, String productId, Long memberId) {
        Member member = memberService.findMember(memberId);
        Reservation reservation = findReservation(reservationId);

        Product product = productService.findProduct(productId);

        validateOwner(reservation, member, product);

        reservation.setStatus(RESERVED);

        return AcceptReservation.Response.from(reservation);
    }

    @Transactional
    public CancelReservation.Response cancelReservationByLender(String reservationId, String productId, Long memberId) {
        Member member = memberService.findMember(memberId);
        Reservation reservation = findReservation(reservationId);

        Product product = productService.findProduct(productId);

        validateOwner(reservation, member, product);

        // 예약상태가 Requested가 아니면 취소 불가능
        if (reservation.getStatus() != ReservationStatus.REQUESTED) {
            throw new BusinessLogicException(NOT_POSSIBLE_CANCEL);
        }
        reservation.setStatus(CANCELED);

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

    private void validateOwner(Product product, Member member) {
        if (!Objects.equals(product.getMember().getMemberId(), member.getMemberId())) {
            throw new BusinessLogicException(UNAUTHORIZED);
        }
    }

    public GetBorrowReservations getReservationByBorrower(Long memberId, ReservationStatus status,
                                                          int size, int page) {
        memberService.findMember(memberId);

        Page<BorrowReservationDto> reservations = reservationRepository
                .findBorrowReservationDtosByMemberId(memberId, status, PageRequest.of(page, size,  Sort.by("createdAt").ascending()));

        return GetBorrowReservations.from(reservations);
    }

    public GetLendReservations getReservationByLender(Long memberId, String productId,
                                                      ReservationStatus status, int size, int page) {
        Member member = memberService.findMember(memberId);
        Product product = productService.findProduct(productId);

        validateOwner(product, member);

        Page<LendReservationDto> reservations = reservationRepository
                .findLendReservationDtosByProductId(productId, status, PageRequest.of(page, size));

        return GetLendReservations.from(reservations);
    }

    public List<ReservationCalendarDto> getReservationByMonth(String productId, String date) {
        LocalDate startDate = LocalDate.parse(date + "-01");
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Reservation> reservations = reservationRepository.findReservationByDate(productId, CANCELED, startDate, endDate);

        return reservations.stream()
                .map(ReservationCalendarDto::from)
                .collect(Collectors.toList());
    }

    public GetReservationsMonth.Response getReservationsByMonth(String productId, String date1, String date2) {
        Product product = productService.findProduct(productId);

        List<ReservationCalendarDto> reservationDate1 = getReservationByMonth(productId, date1);
        List<ReservationCalendarDto> reservationDate2 = getReservationByMonth(productId, date2);

        return GetReservationsMonth.Response.from(product, reservationDate1, reservationDate2);
    }

    @Transactional
    public void rateReservation(String reservationId, Long memberId, int score) {
        Member member = memberService.findMember(memberId);
        Reservation reservation = findReservation(reservationId);

        validateOwner(reservation, member);

        Product product = reservation.getProduct();
        product.setTotalRateCount(product.getTotalRateCount() + 1);
        product.setTotalRateScore(product.getTotalRateScore() + score);
    }

    public long countAllReservation(Long memberId) {
        long borrowCount = reservationRepository.countByMemberMemberId(memberId);

        log.info("borrowCount : {}", borrowCount);
        List<Product> products = productService.findProductByMemberId(memberId);

        long lenderCount = products.stream()
                .mapToLong(p -> reservationRepository.countByProductProductId(p.getProductId()))
                .sum();
        log.info("borrowCount : {}", lenderCount);

        return borrowCount + lenderCount;
    }
}
