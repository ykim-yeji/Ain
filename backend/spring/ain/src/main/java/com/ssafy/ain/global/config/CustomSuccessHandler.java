package com.ssafy.ain.global.config;

import com.ssafy.ain.global.dto.CustomOAuth2User;
import com.ssafy.ain.global.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Value("${spring.jwt.live.access}")
    private Long accessExpiredMs;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Long memberId = customOAuth2User.getMemberId();

        String accessToken = jwtUtil.createJwt(memberId, accessExpiredMs);
        response.addHeader("Cookie-Token", createCookie(accessToken));
        response.sendRedirect("http://localhost:3000");
    }

    private String createCookie(String value) {

        return ResponseCookie.from("Authorization", value)
                .maxAge(accessExpiredMs.intValue())
                .path("/")
//                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build()
                .toString();
    }
}