package com.ssafy.ain.member.service.impl;

import static com.ssafy.ain.global.constant.ErrorCode.*;
import static com.ssafy.ain.global.constant.JwtConstant.*;

import com.ssafy.ain.global.constant.ErrorCode;
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
	public void getReissuedToken(HttpServletRequest request, HttpServletResponse response) {
		String refreshToken = getRefreshTokenFromCookie(request);
		isTokenExpired(refreshToken, REFRESH_TOKEN);

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

	/**
	 * 쿠키로부터 리프레시 토큰 추출
	 * @param request 요청
	 * @return
	 */
	@Override
	public String getRefreshTokenFromCookie(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
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
		if (refreshToken == null) {

			throw new NoExistException(NOT_EXISTS_REFRESH_TOKEN);
		}
		log.info("refreshToken(" + refreshToken + ")");

		return refreshToken;
	}

	/**
	 * 토큰이 만료됬는지 확인
	 * @param token 토큰 (access token 또는 refresh token)
	 */
	@Override
	public void isTokenExpired(String token, String category) {
		if (jwtUtil.isExpired(token)) {
			ErrorCode errorCode = SERVER_ERROR;
			if (category.equals(ACCESS_TOKEN)) {
				errorCode = EXPIRES_ACCESS_TOKEN;
			}
			if (category.equals(REFRESH_TOKEN)) {
				errorCode = EXPIRES_REFRESH_TOKEN;
			}

            throw new InvalidException(errorCode);
		}
	}
}