package com.ssafy.ain.member.controller;

import static com.ssafy.ain.global.constant.SuccessCode.*;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.member.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

	private final AuthService authService;

	@PostMapping("/reissue")
	public ApiResponse<?> getReissuedToken(HttpServletRequest request, HttpServletResponse response) {
		authService.getReissuedToken(request, response);

		return ApiResponse.success(REISSUE_ACCESS_TOKEN);
	}
}