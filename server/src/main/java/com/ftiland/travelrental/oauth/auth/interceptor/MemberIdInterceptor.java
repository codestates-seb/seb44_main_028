package com.ftiland.travelrental.oauth.auth.interceptor;

import com.ftiland.travelrental.common.utils.MemberAuthUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class MemberIdInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long memberId = MemberAuthUtils.extractMemberIdFromAuthentication(authentication);
        request.setAttribute("memberId", memberId);
        return true;
    }
}

