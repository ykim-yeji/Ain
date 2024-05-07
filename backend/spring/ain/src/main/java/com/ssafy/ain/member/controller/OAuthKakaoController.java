package com.ssafy.ain.member.controller;

import com.ssafy.ain.member.service.OAuthKakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/oauth/kakao")
public class OAuthKakaoController {

    private final OAuthKakaoService oauthKakaoService;

    @GetMapping("/test")
    public String test() {
        System.out.println("여기까지");

        return "로그인 성공 확인!!";
    }
}