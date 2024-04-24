package com.ssafy.ain.member.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberStatus {

    DELETE("회원 탈퇴"), LOGIN("로그인"), LOGOUT("로그아웃");

    private String name;
}