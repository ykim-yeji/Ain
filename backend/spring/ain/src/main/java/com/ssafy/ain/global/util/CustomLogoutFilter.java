package com.ssafy.ain.global.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ain.member.service.AuthService;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static com.ssafy.ain.global.constant.ErrorCode.*;
import static com.ssafy.ain.global.constant.JwtConstant.EXCEPTION;
import static com.ssafy.ain.global.constant.JwtConstant.REFRESH_TOKEN;
import static com.ssafy.ain.global.constant.SuccessCode.LOGOUT;

@RequiredArgsConstructor
@Slf4j
public class CustomLogoutFilter extends GenericFilterBean {

	private final JwtUtil jwtUtil;
	private final RefreshTokenRepository refreshTokenRepository;
	private final AuthService authService;

	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
						 FilterChain filterChain) throws IOException, ServletException {
		doFilter((HttpServletRequest) servletRequest, (HttpServletResponse) servletResponse, filterChain);

	}

	private void doFilter(HttpServletRequest request, HttpServletResponse response,
						  FilterChain filterChain) throws IOException, ServletException {
		String requestUri = request.getRequestURI();
		log.info("requestURI(" + request.getRequestURI() + ")");
		if (!requestUri.matches("^/auth/logout$")) {

			filterChain.doFilter(request, response);
			return;
		}

		String requestMethod = request.getMethod();
		log.info("requestMethod(" + request.getMethod() + ")");
		if (!requestMethod.equals("POST")) {

			filterChain.doFilter(request, response);
			request.setAttribute(EXCEPTION, NOT_HTTP_METHOD_POST);
			return;
		}

		Cookie[] cookies = request.getCookies();
		if (cookies == null) {

			request.setAttribute(EXCEPTION, NOT_EXISTS_COOKIE);
			filterChain.doFilter(request, response);
			return;
		}
		String refreshToken = null;
		for (Cookie cookie : cookies) {
			if (REFRESH_TOKEN.equals(cookie.getName())) {
				refreshToken = cookie.getValue();
				break;
			}
		}
		if (refreshToken == null) {

			request.setAttribute(EXCEPTION, NOT_EXISTS_REFRESH_TOKEN);
			filterChain.doFilter(request, response);
			return;
		}
		log.info("refreshToken(" + refreshToken + ")");

		if (jwtUtil.isExpired(refreshToken)) {

			request.setAttribute(EXCEPTION, EXPIRES_REFRESH_TOKEN);
			filterChain.doFilter(request, response);
			return;
		}

		String category = jwtUtil.getCategory(refreshToken);
		if (!category.equals(REFRESH_TOKEN)) {

			request.setAttribute(EXCEPTION, NOT_REFRESH_TOKEN);
			filterChain.doFilter(request, response);
			return;
		}

		if (!refreshTokenRepository.existsById(refreshToken)) {

			request.setAttribute(EXCEPTION, NOT_LOGIN_MEMBER);
			filterChain.doFilter(request, response);
			return;
		}

		refreshTokenRepository.deleteById(refreshToken);

		Map<String, Object> responseBody = new HashMap<>();
		responseBody.put("code", LOGOUT.getStatus().value());
		responseBody.put("status", LOGOUT.getStatus());
		responseBody.put("message", LOGOUT.getMessage());

		ObjectMapper objectMapper = new ObjectMapper();
		response.getWriter().write(objectMapper.writeValueAsString(responseBody));

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.addCookie(authService.createCookie(REFRESH_TOKEN, null, 0L));
	}
}