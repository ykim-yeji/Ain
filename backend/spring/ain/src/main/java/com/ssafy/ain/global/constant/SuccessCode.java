package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@AllArgsConstructor
@Getter
public enum SuccessCode {

    //인증 및 인가
    REISSUE_ACCESS_TOKEN(CREATED, "access token을 재발급하는데 성공했습니다."),
    GET_MEMBER(OK, "회원 정보를 조회하는데 성공했습니다!"),
    LOGIN(OK, "로그인을 하는데 성공했습니다!"),
    LOGOUT(OK, "로그아웃을 하는데 성공했습니다!"),

    //회원
    UPDATE_MEMBER_INFO(OK, "회원 정보를 입력하는데 성공했습니다!"),
    GET_MEMBER_INFO(OK, "회원 정보를 조회하는데 성공했습니다!"),

    //이상형
    GET_IDEAL_PEOPLE(OK, "이상형 목록 조회에 성공하였습니다!"),
    MODIFY_RANKING_OF_IDEAL_PEOPLE(OK, "이상형 선호 순위를 성공적으로 변경하였습니다!"),
    GET_NAME_OF_IDEAL_PERSON(CREATED, "이상형 이름 생성에 성공하였습니다!"),
    ADD_IDEAL_PERSON(CREATED, "이상형 정보를 성공적으로 저장하였습니다!");

    private final HttpStatus status;
    private final String message;
}