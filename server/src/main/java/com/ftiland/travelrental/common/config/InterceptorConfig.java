package com.ftiland.travelrental.common.config;

import com.ftiland.travelrental.oauth.auth.interceptor.CurrentMemberIdInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Autowired
    private CurrentMemberIdInterceptor currentMemberIdInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(currentMemberIdInterceptor)
                .addPathPatterns("/**");
    }
}