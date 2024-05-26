package com.ssafy.ain.member.service;

import com.ssafy.ain.global.constant.ErrorCode;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Map;

public interface AuthService {

	void getReissuedToken(HttpServletRequest request, HttpServletResponse response);
	Cookie createCookie(String name, String value, Long expiredMs);
	String getRefreshTokenFromCookie(HttpServletRequest request);
	void isTokenExpired(String token, String category);
	void equalTokenCategory(String token, String categoryForCheck);
	void existRefreshToken(String refreshToken);
	Map<String, Object> getErrorResponse(ErrorCode errorCode);
	Map<String, Object> getErrorResponse(RuntimeException runtimeException);
}