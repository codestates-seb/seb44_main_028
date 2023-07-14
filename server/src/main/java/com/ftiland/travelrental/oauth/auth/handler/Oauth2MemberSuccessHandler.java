package com.ftiland.travelrental.oauth.auth.handler;

import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.oauth.config.UrlConfig;
import com.ftiland.travelrental.oauth.jwt.JwtTokenizer;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@Component
public class Oauth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private final UrlConfig urlConfig;

    public Oauth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, MemberService memberService, UrlConfig urlConfig) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
        this.urlConfig = urlConfig;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        Map<String, Object> kakaoAccount = (Map<String, Object>)oAuth2User.getAttribute("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        String email = String.valueOf(kakaoAccount.get("email"));
        String displayName = (String) profile.get("nickname");

        Long memberId;
        if(!memberService.existsEmail(email)) {
            Member savedMember = saveMember(email, displayName);
            memberId = savedMember.getMemberId();
        } else {
            Member findMember = memberService.findMemberByEmail(email);
            memberId = findMember.getMemberId();
        }

        redirect(request, response, displayName, memberId, email);
    }

    private Member saveMember(String email, String displayName) {
        Member member = new Member(email, displayName);
        Member savedMember = memberService.createMember(member);

        return savedMember;
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String displayName, Long memberId, String email) throws IOException {
        String accessToken = delegateAccessToken(displayName, memberId, email);
        String refreshToken = delegateRefreshToken(email);

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(30 * 24 * 60 * 60);
        response.addCookie(refreshTokenCookie);

        String uri = urlConfig.createURI();

        String redirectUri = UriComponentsBuilder.fromUriString(uri)
                .queryParam("access_token", accessToken).toUriString();

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + redirectUri);
            return;
        }

        getRedirectStrategy().sendRedirect(request, response, redirectUri);
    }

    private String delegateAccessToken(String displayName, Long memberId, String email) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", memberId);
        claims.put("displayName", displayName);
        claims.put("email", email);

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String email) {
        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}
