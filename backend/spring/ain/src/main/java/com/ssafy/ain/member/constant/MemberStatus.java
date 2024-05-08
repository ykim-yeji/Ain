package com.ssafy.ain.member.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberStatus {

    LOGIN("로그인"), LOGOUT("로그아웃"), DELETE("회원 탈퇴");

    private String name;
}