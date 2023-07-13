package com.ftiland.travelrental.oauth.auth.interceptor;

import com.ftiland.travelrental.common.annotation.CurrentMemberId;
import com.ftiland.travelrental.common.utils.JwtUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Parameter;

public class CurrentMemberIdInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            Parameter[] parameters = handlerMethod.getMethod().getParameters();
            for (Parameter parameter : parameters) {
                if (parameter.isAnnotationPresent(CurrentMemberId.class)) {
                    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                    Long memberId = JwtUtils.extractMemberIdFromAuthentication(authentication);
                    System.out.println(parameter.getName());
                    System.out.println(memberId);
                    request.setAttribute(parameter.getName(), memberId);
                }
            }
        }
        return true;
    }
}

