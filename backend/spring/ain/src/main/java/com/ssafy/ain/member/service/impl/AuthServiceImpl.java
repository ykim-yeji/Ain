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
		//refresh token 얻기
		String cookie = request.getHeader(HttpHeaders.SET_COOKIE);
		if (cookie == null || cookie.startsWith(REFRESH_TOKEN + "=")) {

			throw new NoExistException(NOT_EXISTS_REFRESH_TOKEN);
		}

		//refresh token이 만료되었는지 확인한다.
		String refreshToken = cookie.split("=")[1];
		if (jwtUtil.isExpired(refreshToken)) {

			throw new InvalidException(EXPIRES_REFRESH_TOKEN);
		}

		//토큰이 Refresh 토큰인지 확인한다. (발급 시 페이로드에 명시)
		String category = jwtUtil.getCategory(refreshToken);
		if (!category.equals(REFRESH_TOKEN)) {

			throw new InvalidException(INVALID_TOKEN);
		}

		//Redis에 해당 Refresh 토큰이 저장되어 있는지 확인
		if (!refreshTokenRepository.existsById(refreshToken)) {

			throw new InvalidException(INVALID_TOKEN);
		}

		//토큰 검증이 완료된 후 memberId 값을 획득
		Long memberId = jwtUtil.getMemberId(refreshToken);

		//새로운 Access 토큰 생성
		String reissuedAccessToken = jwtUtil.createJwt(ACCESS_TOKEN, memberId, accessExpiredMs);
		String reissuedRefreshToken = jwtUtil.createJwt(REFRESH_TOKEN, memberId, refreshExpiredMs);

		//Refresh Rotate: Redis에 기존 Refresh 토큰을 삭제하고 새로운 Refresh 토큰을 저장
		refreshTokenRepository.deleteById(refreshToken);
		refreshTokenRepository.save(
			RefreshToken.builder()
				.refreshToken(reissuedRefreshToken)
				.memberId(memberId)
				.build()
		);

		//재발급한 토큰을 응답 헤더에 추가
		response.setHeader("Authorization", "Bearer " + reissuedAccessToken);
		response.setHeader(HttpHeaders.SET_COOKIE, createCookie(REFRESH_TOKEN, reissuedRefreshToken, refreshExpiredMs));

		return null;
	}

	//쿠키 생성 메소드
	@Override
	public String createCookie(String name, String value, Long expiredMs) {

		return ResponseCookie.from(name, value)
			.maxAge(expiredMs.intValue())
			.path("/")
			//                .secure(true)
			.sameSite("None")
			.httpOnly(true)
			.build()
			.toString();
	}
}