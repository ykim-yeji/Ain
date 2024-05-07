package com.ssafy.ain.global.config;

import static com.ssafy.ain.global.constant.JwtConstant.*;

import com.ssafy.ain.global.dto.CustomOAuth2User;
import com.ssafy.ain.global.entity.RefreshToken;
import com.ssafy.ain.global.util.JwtUtil;
import com.ssafy.ain.global.util.RefreshTokenRepository;
import com.ssafy.ain.member.service.AuthService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final AuthService authService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${spring.jwt.live.access}")
    private Long accessExpiredMs;
    @Value("${spring.jwt.live.refresh}")
    private Long refreshExpiredMs;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        //유저 정보
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Long memberId = customOAuth2User.getMemberId();

        //토큰 생성
        String accessToken = jwtUtil.createJwt(ACCESS_TOKEN, memberId, accessExpiredMs);
        String refreshToken = jwtUtil.createJwt(REFRESH_TOKEN, memberId, refreshExpiredMs);

        //refresh token을 redis에 저장
        refreshTokenRepository.save(
            RefreshToken.builder()
                .refreshToken(refreshToken)
                .memberId(memberId)
                .build()
        );

        //응답 설정
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader(HttpHeaders.SET_COOKIE, authService.createCookie(REFRESH_TOKEN, refreshToken, refreshExpiredMs));
        response.sendRedirect("http://localhost:3000");
    }
}