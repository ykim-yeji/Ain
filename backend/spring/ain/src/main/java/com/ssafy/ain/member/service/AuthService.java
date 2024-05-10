package com.ssafy.ain.member.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

	String getReissuedToken(HttpServletRequest request, HttpServletResponse response);

	String createCookie(String name, String value, Long expiredMs);
}