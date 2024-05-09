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
    NOT_EXISTS_REFRESH_TOKEN(UNAUTHORIZED, "refresh token이 존재하지 않습니다!"),
    EXPIRES_ACCESS_TOKEN(UNAUTHORIZED, "access token이 만료되었습니다!"),
    EXPIRES_REFRESH_TOKEN(UNAUTHORIZED, "만료된 refresh token입니다!"),
    INVALID_OAUTH_PROVIDER(UNAUTHORIZED, "유효하지 않는 로그인 기관입니다!"),
    NOT_REFRESH_TOKEN(BAD_REQUEST, "토큰 유형이 refresh token이 아닙니다!"),
    NOT_ACCESS_TOKEN(BAD_REQUEST, "토큰 유형이 access token이 아닙니다!"),
    NOT_EXISTS_COOKIE(BAD_REQUEST, "Cookie가 존재하지 않습니다!"),
    INVALID_TOKEN(UNAUTHORIZED, "유효하지 않는 토큰입니다!"),
    NOT_LOGIN_MEMBER(FORBIDDEN, "해당 회원은 로그아웃한 상태입니다!"),

    //이상형
    NOT_EXISTS_IDEAL_PERSON(NOT_FOUND, "존재하지 않는 이상형입니다!"),

    //s3
    NOT_EXISTS_FILE(NOT_FOUND, "file이 존재하지 않습니다!"),
    NOT_EXISTS_FILE_TO_UPLOAD(BAD_REQUEST, "업로드할 파일이 존재하지 않습니다!"),
    NOT_UPLOADS_FILE(INTERNAL_SERVER_ERROR, "이미지 업로드에 실패하였습니다!"),
    INVALID_URL_FORMAT(BAD_REQUEST, "요청한 URL 형식이 올바르지 않습니다!");

    private final HttpStatus status;
    private final String message;
}