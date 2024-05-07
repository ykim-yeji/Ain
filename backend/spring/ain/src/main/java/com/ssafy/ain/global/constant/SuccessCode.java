package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@Getter
public enum SuccessCode {

    //회원
    REISSUE_ACCESS_TOKEN(CREATED, "access token을 재발급하는데 성공했습니다."),
    GET_MEMBER(OK, "회원 정보를 조회하는데 성공했습니다!"),
    UPDATE_MEMBER_STATUS_LOGIN(OK, "로그인을 하는데 성공했습니다!");

    private final HttpStatus status;
    private final String message;
}