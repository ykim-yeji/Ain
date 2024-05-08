package com.ssafy.ain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class AuthDTO {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class LoginResponse {
        private Long memberId;
        private String memberAccessToken;
        private String memberRefreshToken;
        private boolean isNewMember;
    }
}