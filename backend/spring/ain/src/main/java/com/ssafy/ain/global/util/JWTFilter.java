package com.ssafy.ain.global.util;

import static com.ssafy.ain.global.constant.ErrorCode.EXPIRES_ACCESS_TOKEN;
import static com.ssafy.ain.global.constant.ErrorCode.NOT_ACCESS_TOKEN;
import static com.ssafy.ain.global.constant.JwtConstant.*;

import com.ssafy.ain.global.dto.UserInfoDTO;
import com.ssafy.ain.global.dto.UserPrincipal;
import com.ssafy.ain.global.exception.InvalidException;
import com.ssafy.ain.member.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = authorization.split(" ")[1];
        try {
            authService.isTokenExpired(accessToken, ACCESS_TOKEN);
            authService.equalTokenCategory(accessToken, ACCESS_TOKEN);
        } catch (InvalidException e) {

            request.setAttribute(EXCEPTION, e.getCode());
            filterChain.doFilter(request, response);
            return;
        }

        Long memberId = jwtUtil.getMemberId(accessToken);
        UserPrincipal userPrincipal = UserPrincipal.builder()
                .userInfoDTO(
                        UserInfoDTO.builder()
                                .memberId(memberId)
                                .build()
                )
                .build();
        Authentication authToken = new UsernamePasswordAuthenticationToken(userPrincipal, null, userPrincipal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}