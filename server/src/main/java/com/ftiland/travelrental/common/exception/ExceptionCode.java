package com.ftiland.travelrental.common.exception;

import lombok.Getter;

public enum ExceptionCode {
    UNAUTHORIZED_ACCESS(501,"권한이 없습니다"),
    CHATROOM_ALREADY_EXISTS(501,"Chatroom already exists"),
    INTEREST_NOT_EXISTS(409,"Interest not exists"),
    IMAGE_DELETE_FAILED(501,"Image delete failed"),
    IMAGE_SAVE_FAILED(501,"Image save failed"),
    NOT_EXISTS(409,"Not exists"),
    INTEREST_EXISTS(409,"Interest exists"),
    IMAGE_EMPTY(501,"이미지가 없습니다."),
    MEMBER_NOT_FOUND(404, "멤버가 존재하지 않습니다."),
    MEMBER_EXISTS(409, "Member exists"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    PRODUCT_NOT_FOUND(404, "대여 물품이 존재하지 않습니다."),
    UNAUTHORIZED(403, "권한이 없습니다."),
    NOT_FOUND_LOCATION(403, "주소가 없습니다."),
    NOT_FOUND_RESERVATION(404, "예약이 존재하지 않습니다."),
    CATEGORY_NOT_FOUND(404, "존재하지 않는 카테고리입니다."),
    NOT_POSSIBLE_CANCEL(400, "예약취소 불가"),
    NOT_FOUND_IMAGE_MEMBER(404, "멤버 이미지가 존재하지 않습니다."),
    RESERVATION_NOT_ALLOWED(400, "자신의 상품에 예약요청을 할 수 없습니다."),
    WRONG_RESERVATION(400, "예약 날짜가 잘못되었습니다."),
    WRONG_MINIMUM_PERIOD(400, "예약 기간이 최소 기간보다 짧습니다."),
    EXIST_RESERVATION(400, "해당 기간에 예약이 존재합니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}