package com.ssafy.ain.global.dto;

import com.ssafy.ain.global.constant.LoginProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserInfoDTO {

    private Long memberId;
    private Long memberLoginId;
    private LoginProvider loginProvider;
}