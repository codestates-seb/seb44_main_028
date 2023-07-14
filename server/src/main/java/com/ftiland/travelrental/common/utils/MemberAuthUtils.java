package com.ftiland.travelrental.common.utils;

import com.ftiland.travelrental.common.exception.BusinessLogicException;
import com.ftiland.travelrental.common.exception.ExceptionCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

public class MemberAuthUtils {
    public static Long extractMemberIdFromAuthentication(Authentication authentication) {
        Long memberId = null;
        if (authentication != null && authentication.getPrincipal() instanceof Map) {
            Map<String, Object> principalMap = (Map<String, Object>) authentication.getPrincipal();
            Object memberIdObj = principalMap.get("memberId");

            if (memberIdObj instanceof Long) {
                return (Long) memberIdObj;
            } else if (memberIdObj instanceof Integer) {
                return ((Integer) memberIdObj).longValue();
            }
        }

        return null;
    }

    public static Long getMemberId(HttpServletRequest request) {
        Long memberId = (Long) request.getAttribute("memberId");
        validateMemberId(memberId);
        return memberId;
    }

    private static void validateMemberId(Long memberId) {
        if (memberId == null) {
            throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_STATUS);
        }
    }

}
