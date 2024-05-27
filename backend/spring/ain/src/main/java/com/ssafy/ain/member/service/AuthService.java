package com.ssafy.ain.member.service;

import java.io.IOException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

	void getReissuedToken(HttpServletRequest request, HttpServletResponse response);
	Cookie createCookie(String name, String value, Long expiredMs);
	String getRefreshTokenFromCookie(HttpServletRequest request);
	void isTokenExpired(String token, String category);
	void equalTokenCategory(String token, String categoryForCheck);
	void existRefreshToken(String refreshToken);
	void addErrorInResponse(HttpServletRequest request, HttpServletResponse response,
		RuntimeException runtimeException) throws IOException;
}