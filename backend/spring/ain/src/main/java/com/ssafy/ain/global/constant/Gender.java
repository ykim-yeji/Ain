package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Gender {

    MALE("남자"), FEMALE("여자");

    private String name;
}