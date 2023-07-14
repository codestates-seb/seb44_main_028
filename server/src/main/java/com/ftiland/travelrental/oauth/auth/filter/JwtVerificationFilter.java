package com.ftiland.travelrental.oauth.auth.filter;

import com.ftiland.travelrental.member.entity.Member;
import com.ftiland.travelrental.member.service.MemberService;
import com.ftiland.travelrental.oauth.jwt.JwtTokenizer;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;
    private static final Logger logger = LoggerFactory.getLogger(JwtVerificationFilter.class);

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, MemberService memberService) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {

            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
//            request.setAttribute("exception", ee);
            handleTokenExpiration(request, response);
            return;
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");
        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) throws ServletException {
        String jws = request.getHeader("Authorization").replace("Bearer", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {

        Integer memberId = (Integer) claims.get("memberId");
        Long memberIdLong = memberId != null ? memberId.longValue() : null;
        Authentication authentication = new UsernamePasswordAuthenticationToken(claims, null, null);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void handleTokenExpiration(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String refreshToken = getRefreshTokenFromCookie(request, "refreshToken");

        if (refreshToken != null) {
            try {
                // Refresh token 유효성 검사
                String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
                Map<String, Object> refreshTokenClaims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody();
                Long refreshTokenMemberId = (Long) refreshTokenClaims.get("memberId");
                if (refreshTokenMemberId != null) {
                    // check member exist
                    Member member = memberService.findMember(refreshTokenMemberId);
                    // Access token 재발급
                    Map<String, Object> claims = new HashMap<>();
                    claims.put("memberId", member.getMemberId());
                    claims.put("displayName", member.getDisplayName());
                    claims.put("email", member.getEmail());

                    String subject = member.getEmail();
                    Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

                    String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

                    // Response Header에 새로운 Access token 설정
                    response.setHeader("Authorization", "Bearer " + accessToken);
                    // Response 200 OK
                    response.setStatus(HttpServletResponse.SC_OK);
                    return;
                }
            } catch (ExpiredJwtException e) {
                // Refresh token도 만료된 경우
            } catch (Exception e) {
            }
        }

        // 401 Unauthorized 에러 반환
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }

    private String getRefreshTokenFromCookie(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(cookieName)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
