package com.ssafy.ain.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MemberDTO {

    @Getter
    @Setter
    public static class AddMemberInfoRequest {
        @NotBlank(message = "회원 닉네임을 입력하지 않았습니다!")
        @Size(min = 1, max = 5, message = "회원 닉네임의 글자 수 제한을 지키지 않았습니다!")
        private String memberNickname;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class GetMemberInfoResponse {
        private String memberNickname;
    }
}