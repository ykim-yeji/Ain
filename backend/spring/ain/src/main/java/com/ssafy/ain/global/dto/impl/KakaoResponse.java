package com.ssafy.ain.global.dto.impl;

import com.ssafy.ain.global.constant.LoginProvider;
import com.ssafy.ain.global.dto.OAuth2Response;
import lombok.RequiredArgsConstructor;

import java.util.Map;

@RequiredArgsConstructor
public class KakaoResponse implements OAuth2Response {

    private final Map<String, Object> attribute;

    @Override
    public Long getOAuthId() {

        return Long.valueOf(attribute.get("id").toString());
    }

    @Override
    public LoginProvider getOAuthProvider() {

        return LoginProvider.KAKAO;
    }
}