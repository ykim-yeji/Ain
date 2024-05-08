package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum LoginProvider {

    KAKAO("카카오", "kakao");

    private String koName;
    private String enName;
}