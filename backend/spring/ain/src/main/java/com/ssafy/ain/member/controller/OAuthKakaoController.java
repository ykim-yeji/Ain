package com.ssafy.ain.member.controller;

import com.ssafy.ain.member.service.OAuthKakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth/kakao")
public class OAuthKakaoController {

    private final OAuthKakaoService oauthKakaoService;
}