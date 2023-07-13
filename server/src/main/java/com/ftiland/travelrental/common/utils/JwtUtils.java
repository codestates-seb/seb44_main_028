package com.ftiland.travelrental.common.utils;

import org.springframework.security.core.Authentication;

import java.util.Map;

public class JwtUtils {
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
}
