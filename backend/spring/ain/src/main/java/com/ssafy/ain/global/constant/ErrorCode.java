package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    //회원
    NOT_EXISTS_MEMBER(NOT_FOUND, "존재하지 않는 회원입니다!");

    private final HttpStatus status;
    private final String message;
}