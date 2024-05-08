package com.ssafy.ain.global.util;

import static com.ssafy.ain.global.constant.JwtConstant.*;

import com.ssafy.ain.global.dto.CustomOAuth2User;
import com.ssafy.ain.global.dto.OAuthUserDTO;
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

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //요청 헤더에서 Authorization 키에 담긴 토큰을 꺼낸다.
        String authorization = request.getHeader("Authorization");

        //토큰이 없다면 또는 Bearer 헤더가 아니라면 다음 필터로 넘긴다.
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);

            return;
        }

        //토큰이 만료되었는지 여부를 확인한다. 만료되었다면 다음 필터로 넘기지 않는다.
        String accessToken = authorization.split(" ")[1];
        if (jwtUtil.isExpired(accessToken)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            return;
        }

        //토큰이 Access 토큰인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(accessToken);
        if (!category.equals(ACCESS_TOKEN)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

            return;
        }

        //토큰 검증이 완료된 후 memberId 값을 획득
        Long memberId = jwtUtil.getMemberId(accessToken);

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