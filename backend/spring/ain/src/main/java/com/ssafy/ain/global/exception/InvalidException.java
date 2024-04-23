package com.ssafy.ain.global.exception;

import com.ssafy.ain.global.constants.ErrorCode;
import lombok.Getter;

@Getter
public class InvalidException extends RuntimeException {

    private final ErrorCode code;

    public InvalidException(ErrorCode code) {
        super(code.getMessage());
        this.code = code;
    }
}
