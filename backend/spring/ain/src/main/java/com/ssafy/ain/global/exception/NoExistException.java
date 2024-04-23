package com.ssafy.ain.global.exception;

import com.ssafy.ain.global.constants.ErrorCode;
import lombok.Getter;

@Getter
public class NoExistException extends RuntimeException {

    private final ErrorCode code;

    public NoExistException(ErrorCode code) {
        super(code.getMessage());
        this.code = code;
    }
}