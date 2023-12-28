package com.smartFarmer.server.configuration;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtProvider {
    private String SECRET_KEY = "REQUIRE PRIVATE SECURITY KEY!!!!";
    private Map<String, Object> claims = new HashMap<>();

    @Value("${jwt.jwtExpirationTime}")
    private int jwtExpirationTime;

    @Value("${jwt.jwtRefreshExpirationMs}")
    private int refreshTokenDurationMs;

    public JwtProvider() {
    };

    public JwtProvider(String accountId, List<String> roles) {
        this.claims.put("roles", roles);
    };

    public SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    public String getEmailFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSecretKey())
                .build().parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public ResponseCookie generateJwtCookie(String email) {
        String jwt = generateToken(email, jwtExpirationTime);
        return generateCookie("accessCookie", jwt, "/", jwtExpirationTime);
    }

    public ResponseCookie generateRefreshJwtCookie(String refreshToken) {
        return generateCookie("refreshCookie", refreshToken, "/auth/refresh", refreshTokenDurationMs);
    }

    public String getTokenFromHttp(HttpServletRequest request, String name) {
        Cookie cookie = WebUtils.getCookie(request, name);

        if (cookie == null) {
            return null;
        } else {
            return cookie.getValue();
        }
    }

    private String generateToken(String email, Integer time) {
        return Jwts.builder()
                .subject(email)
                .expiration(new Date(System.currentTimeMillis() + 60000 * time))
                .issuedAt(new Date(System.currentTimeMillis()))
                .signWith(getSecretKey(), Jwts.SIG.HS256)
                .compact();
    }

    private ResponseCookie generateCookie(String cookieName, String cookieValue, String path, int time) {
        ResponseCookie cookie = ResponseCookie.from(cookieName, cookieValue)
                .path(path)
                .maxAge(time * 60)
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();

        return cookie;
    }
}
