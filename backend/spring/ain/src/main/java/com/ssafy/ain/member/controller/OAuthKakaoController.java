package com.ssafy.ain.member.controller;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.member.dto.AuthDTO.*;
import com.ssafy.ain.member.service.OAuthKakaoService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ain.global.constant.SuccessCode.UPDATE_MEMBER_STATUS_LOGIN;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth/kakao")
public class OAuthKakaoController {

    private final OAuthKakaoService oauthKakaoService;
}