package com.ftiland.travelrental.oauth.auth.handler;

import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.oauth.jwt.JwtTokenizer;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

public class Oauth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    public Oauth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    public Oauth2MemberSuccessHandler(String defaultTargetUrl, JwtTokenizer jwtTokenizer, MemberService memberService) {
        super(defaultTargetUrl);
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        Map<String, Object> kakaoAccount = (Map<String, Object>)oAuth2User.getAttribute("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String email = String.valueOf(kakaoAccount.get("email"));
        String displayName = (String) profile.get("nickname");

        Member savedMember = saveMember(email, displayName);
        Long memberId = savedMember.getMemberId();

        String accessToken = delegateAccessToken(displayName, memberId, email);
        String refreshToken = delegateRefreshToken(displayName);

        response.addHeader("Authorization", "Bearer " + accessToken);
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(30 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);

        String host = "http://localhost:3000";
        getRedirectStrategy().sendRedirect(request, response, host);
//        String uri = createURI(accessToken, refreshToken, host).toString();
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//        response.setCharacterEncoding("UTF-8");
//        response.getWriter().write("{\"message\": \"로그인 성공\"}");

//        super.onAuthenticationSuccess(request, response, authentication);
//        redirect(request, response, displayName, memberId, email);
    }

    private Member saveMember(String email, String displayName) {
        Member member = new Member(email, displayName);
        Member savedMember = memberService.createMember(member);

        return savedMember;
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String displayName, Long memberId, String email) throws IOException {
        String accessToken = delegateAccessToken(displayName, memberId, email);
        String refreshToken = delegateRefreshToken(displayName);

        response.addHeader("Authorization", "Bearer" + accessToken);
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);

//        String uri = createURI(accessToken, refreshToken).toString();
//        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String displayName, Long memberId, String email) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);
        claims.put("displayName", displayName);
        claims.put("email", email);

        String subject = displayName;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String displayName) {
        String subject = displayName;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken, String host) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host(host)
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
