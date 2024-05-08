package com.ssafy.ain.member.service.impl;

import static com.ssafy.ain.global.constant.ErrorCode.*;
import static com.ssafy.ain.global.constant.JwtConstant.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
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
public class AuthServiceImpl implements AuthService {

	private final JwtUtil jwtUtil;
	private final RefreshTokenRepository refreshTokenRepository;

	@Value("${spring.jwt.live.access}")
	private Long accessExpiredMs;
	@Value("${spring.jwt.live.refresh}")
	private Long refreshExpiredMs;

	@Override
	public String getReissuedToken(HttpServletRequest request, HttpServletResponse response) {
		String cookie = request.getHeader(HttpHeaders.SET_COOKIE);
		if (cookie == null || cookie.startsWith(REFRESH_TOKEN + "=")) {

			throw new NoExistException(NOT_EXISTS_REFRESH_TOKEN);
		}

		String refreshToken = cookie.split("=")[1];
		if (jwtUtil.isExpired(refreshToken)) {

			throw new InvalidException(EXPIRES_REFRESH_TOKEN);
		}

		String category = jwtUtil.getCategory(refreshToken);
		if (!category.equals(REFRESH_TOKEN)) {

			throw new InvalidException(INVALID_TOKEN);
		}

		if (!refreshTokenRepository.existsById(refreshToken)) {

			throw new InvalidException(INVALID_TOKEN);
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
		response.setHeader(HttpHeaders.SET_COOKIE, createCookie(REFRESH_TOKEN, reissuedRefreshToken, refreshExpiredMs));

		return null;
	}

	@Override
	public String createCookie(String name, String value, Long expiredMs) {

		return ResponseCookie.from(name, value)
			.maxAge(expiredMs.intValue())
			.path("/")
			//                .secure(true)
			.sameSite("None")
			.httpOnly(true)
			.build()
			.toString().split(";")[0];
	}
}