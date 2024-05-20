package com.ssafy.ain.global.config;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.global.exception.ExistException;
import com.ssafy.ain.global.exception.InvalidException;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.global.exception.ServerException;
import org.springframework.validation.FieldError;
import org.springframework.validation.method.ParameterValidationResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public ApiResponse<?> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        String type = String.valueOf(e.getRequiredType());

        return ApiResponse.error(BAD_REQUEST, type.substring(type.lastIndexOf('.') + 1) +
                " 타입 " + e.getName() + " 입력 형식이 올바르지 않습니다! (입력값 : " + e.getValue() + ")");
    }

    @ExceptionHandler
    public ApiResponse<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        FieldError fieldError = e.getBindingResult().getFieldError();

        return ApiResponse.error(BAD_REQUEST, fieldError.getDefaultMessage() + " (입력값: " + fieldError.getRejectedValue() + ")");
    }

    @ExceptionHandler
    public ApiResponse<?> handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
        String type = e.getParameterType();

        return ApiResponse.error(BAD_REQUEST, type.substring(type.lastIndexOf('.') + 1) +
                " 타입 " + e.getParameterName() + "를 입력하지 않았습니다! (입력값: null)");
    }

    @ExceptionHandler
    public ApiResponse<?> handleHandlerMethodValidationException(HandlerMethodValidationException e) {
        List<ParameterValidationResult> es = e.getAllValidationResults();

        return ApiResponse.error(BAD_REQUEST, e.getDetailMessageArguments()[0] + " (입력값: " + es.get(0).getArgument() + ")");
    }

    @ExceptionHandler
    public ApiResponse<?> handleExistException(ExistException e) {

        return ApiResponse.error(e.getCode());
    }

    @ExceptionHandler
    public ApiResponse<?> handleNoExistException(NoExistException e) {

        return ApiResponse.error(e.getCode());
    }

    @ExceptionHandler
    public ApiResponse<?> handleInvalidException(InvalidException e) {

        return ApiResponse.error(e.getCode());
    }

    @ExceptionHandler
    public ApiResponse<?> handleServerException(ServerException e) {
        return ApiResponse.error(e.getCode());
    }
}