package com.ssafy.ain.member.controller;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.member.dto.AuthDTO.*;
import com.ssafy.ain.member.service.OauthKakaoService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.ain.global.constant.SuccessCode.UPDATE_MEMBER_STATUS_LOGIN;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth/kakao")
public class OauthKakaoController {

    private final OauthKakaoService oauthKakaoService;

    /**
     * 카카오 소셜 로그인
     * @param authorizationCode 인가 코드
     * @return
     */
    @PostMapping("/login")
    public ApiResponse<?> login(@RequestParam @NotBlank(message = "인가 코드를 입력하지 않았습니다!") String authorizationCode) {
        LoginResponse loginResponse = oauthKakaoService.login(authorizationCode);

        return ApiResponse.success(UPDATE_MEMBER_STATUS_LOGIN, loginResponse);
    }
}