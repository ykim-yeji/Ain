package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    //회원
    NOT_EXISTS_MEMBER(NOT_FOUND, "존재하지 않는 회원입니다!"),
    NOT_EXISTS_REFRESH_TOKEN(BAD_REQUEST, "refresh token을 입력하지 않았습니다!"),
    EXPIRES_ACCESS_TOKEN(UNAUTHORIZED, "access token이 만료되었습니다!"),
    EXPIRES_REFRESH_TOKEN(UNAUTHORIZED, "refresh token이 만료되었습니다!"),
    INVALID_TOKEN(UNAUTHORIZED, "유효하지 않는 토큰입니다!");

    private final HttpStatus status;
    private final String message;
}