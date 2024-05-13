package com.ssafy.ain.member.service.impl;

import static com.ssafy.ain.global.constant.ErrorCode.*;
import static com.ssafy.ain.global.constant.JwtConstant.*;

import jakarta.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssafy.ain.global.entity.RefreshToken;
import com.ssafy.ain.global.exception.InvalidException;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.global.util.JwtUtil;
import com.ssafy.ain.global.util.RefreshTokenRepository;
import com.ssafy.ain.member.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

	private final JwtUtil jwtUtil;
	private final RefreshTokenRepository refreshTokenRepository;

	@Value("${spring.jwt.live.access}")
	private Long accessExpiredMs;
	@Value("${spring.jwt.live.refresh}")
	private Long refreshExpiredMs;

	@Override
	public String getReissuedToken(HttpServletRequest request, HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		log.error("토큰 재발급 - cookies: " + Arrays.toString(cookies));
		if (cookies == null) {

			throw new NoExistException(NOT_EXISTS_COOKIE);
		}
		String refreshToken = null;
		for (Cookie cookie : cookies) {
			if (REFRESH_TOKEN.equals(cookie.getName())) {
				refreshToken = cookie.getValue();
				break;
			}
		}
		log.error("토큰 재발급 - refreshToken: " + refreshToken);
		if (refreshToken == null) {

			throw new NoExistException(NOT_EXISTS_REFRESH_TOKEN);
		}
		log.info("refreshToken(" + refreshToken + ")");

		if (jwtUtil.isExpired(refreshToken)) {

			throw new InvalidException(EXPIRES_REFRESH_TOKEN);
		}

		String category = jwtUtil.getCategory(refreshToken);
		if (!category.equals(REFRESH_TOKEN)) {

			throw new InvalidException(NOT_REFRESH_TOKEN);
		}

		if (!refreshTokenRepository.existsById(refreshToken)) {

			throw new InvalidException(NOT_LOGIN_MEMBER);
		}

		Long memberId = jwtUtil.getMemberId(refreshToken);

		String reissuedAccessToken = jwtUtil.createJwt(ACCESS_TOKEN, memberId, accessExpiredMs);
		String reissuedRefreshToken = jwtUtil.createJwt(REFRESH_TOKEN, memberId, refreshExpiredMs);

		refreshTokenRepository.deleteById(refreshToken);
		refreshTokenRepository.save(
			RefreshToken.builder()
				.refreshToken(reissuedRefreshToken)
				.memberId(memberId)
				.build()
		);

		response.setHeader("Authorization", "Bearer " + reissuedAccessToken);
		response.addCookie(createCookie(REFRESH_TOKEN, reissuedRefreshToken, refreshExpiredMs));

		return null;
	}

	@Override
	public Cookie createCookie(String name, String value, Long expiredMs) {
		Cookie cookie = new Cookie(name, value);
		cookie.setMaxAge(expiredMs.intValue());
		cookie.setPath("/");
		cookie.setSecure(true);
		cookie.setHttpOnly(true);

		return cookie;

	}
}