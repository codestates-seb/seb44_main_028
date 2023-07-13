package com.ftiland.travelrental.common.config;

import com.ftiland.travelrental.oauth.auth.interceptor.CurrentMemberIdInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public CurrentMemberIdInterceptor currentMemberIdInterceptor() {
        return new CurrentMemberIdInterceptor();
    }
}
