package com.ssafy.ain.global.util;

import com.ssafy.ain.global.dto.CustomOAuth2User;
import com.ssafy.ain.global.dto.OAuthUserDTO;
import com.ssafy.ain.member.entity.Member;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Cookie-Token");

        if (authorization == null || !authorization.startsWith("Authorization=")) {
            filterChain.doFilter(request, response);

            return;
        }

        String token = authorization.split("=")[1];
        if (jwtUtil.isExpired(token)) {
            filterChain.doFilter(request, response);

            return;
        }

        Long memberId = jwtUtil.getMemberId(token);

        CustomOAuth2User customOAuth2User = new CustomOAuth2User(
                OAuthUserDTO.builder()
                        .memberId(memberId)
                        .build()
        );

        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}