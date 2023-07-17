package com.ftiland.travelrental.common.resolver;

import com.ftiland.travelrental.common.annotation.CurrentMember;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class CurrentMemberResolver implements HandlerMethodArgumentResolver {

    //HandlerMethodArgumentResolver 사용시 오버라이딩 해야 하는 메소드
    //현재 파라미터를 resolver 이 지원하는지에 대한 true/false 값 리턴
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        return methodParameter.hasParameterAnnotation(CurrentMember.class);
    }

    //실제로 바인딩을 할 객체를 리턴 한다.
    @Override
    public Object resolveArgument(MethodParameter methodParameter,
                                  ModelAndViewContainer modelAndViewContainer,
                                  NativeWebRequest nativeWebRequest,
                                  WebDataBinderFactory webDataBinderFactory) {
        return nativeWebRequest.getAttribute("memberId", NativeWebRequest.SCOPE_REQUEST);
    }
}
