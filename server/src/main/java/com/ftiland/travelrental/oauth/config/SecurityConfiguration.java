package com.ftiland.travelrental.oauth.config;

import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.oauth.auth.filter.JwtVerificationFilter;
import com.ftiland.travelrental.oauth.auth.handler.MemberAccessDeniedHandler;
import com.ftiland.travelrental.oauth.auth.handler.MemberAuthenticationEntryPoint;
import com.ftiland.travelrental.oauth.auth.handler.Oauth2MemberSuccessHandler;
import com.ftiland.travelrental.oauth.jwt.JwtTokenizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
//@EnableWebSecurity(debug = true)
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;

    private final MemberService memberService;
    private final UrlConfig urlConfig;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, MemberService memberService, UrlConfig urlConfig) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
        this.urlConfig = urlConfig;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET,"/*/products/members/**" ).authenticated()
                        .antMatchers(HttpMethod.GET,"/*/reservations/products/*/calendar" ).permitAll()
                        .antMatchers(HttpMethod.GET,"/*/reservations/products/*/moreCalendar" ).permitAll()
                        .antMatchers(HttpMethod.GET,"/*/categories").permitAll()
                        .antMatchers(HttpMethod.GET,"/api/products/**").permitAll()
                        .antMatchers("/api/chat/**").permitAll()
                        .antMatchers("/ws/chat/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(new Oauth2MemberSuccessHandler(jwtTokenizer, memberService, urlConfig))
                );
        return http.build();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, memberService);

            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000/","https://playpack-e541f.web.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST" ,"PATCH", "DELETE","OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("Authorization","Refresh","MemberId"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}