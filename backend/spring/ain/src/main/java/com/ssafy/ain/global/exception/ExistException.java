package com.ssafy.ain.global.exception;

import com.ssafy.ain.global.constant.ErrorCode;
import lombok.Getter;

@Getter
public class ExistException extends RuntimeException {

    private final ErrorCode code;

    public ExistException(ErrorCode code) {
        super(code.getMessage());
        this.code = code;
    }
}