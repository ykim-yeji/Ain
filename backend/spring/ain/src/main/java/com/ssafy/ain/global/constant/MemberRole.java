package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MemberRole {

    ADMIN("관리자"), USER("사용자");

    private String name;
}