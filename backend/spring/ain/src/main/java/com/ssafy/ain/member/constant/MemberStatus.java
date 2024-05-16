package com.ssafy.ain.member.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberStatus {

    SIGNUP("회원 가입"), DELETE("회원 탈퇴");

    private String name;
}