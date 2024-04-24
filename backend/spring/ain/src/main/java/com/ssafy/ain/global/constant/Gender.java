package com.ssafy.ain.global.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Gender {

    MALE("남성"), FEMALE("여성");

    private String name;
}