package com.ssafy.ain.global.util;

import java.io.IOException;

import com.ssafy.ain.global.exception.InvalidException;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.member.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import static com.ssafy.ain.global.constant.ErrorCode.*;
import static com.ssafy.ain.global.constant.JwtConstant.REFRESH_TOKEN;

@RequiredArgsConstructor
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
		if (!requestUri.matches("^/api/auth/logout$")) {

			filterChain.doFilter(request, response);
			return;
		}

		String requestMethod = request.getMethod();
		if (!requestMethod.equals("POST")) {

			filterChain.doFilter(request, response);
			return;
		}

		String cookie = request.getHeader(HttpHeaders.SET_COOKIE);
		if (cookie == null || !cookie.startsWith(REFRESH_TOKEN + "=")) {

			throw new NoExistException(NOT_EXISTS_REFRESH_TOKEN);
		}

		String refreshToken = cookie.split("=")[1];
		if (jwtUtil.isExpired(refreshToken)) {

			throw new InvalidException(EXPIRES_REFRESH_TOKEN);
		}

		String category = jwtUtil.getCategory(refreshToken);
		if (!category.equals(REFRESH_TOKEN)) {

			throw new InvalidException(NOT_REFRESH_TOKEN);
		}

		if (!refreshTokenRepository.existsById(refreshToken)) {

			throw new NoExistException(NOT_LOGIN_MEMBER);
		}

		refreshTokenRepository.deleteById(refreshToken);

		response.setHeader(HttpHeaders.SET_COOKIE, authService.createCookie(REFRESH_TOKEN, null, 0L));
	}
}