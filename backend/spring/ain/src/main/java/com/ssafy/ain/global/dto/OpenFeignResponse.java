package com.ssafy.ain.global.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class OpenFeignResponse<T> {

    private final int code;
    private final String status;
    private final String message;
    private T data;
}