package com.ssafy.ain.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ain.global.constant.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        Object exception = request.getAttribute("exception");
        Map<String, Object> errorResponse = null;
        if (exception instanceof ErrorCode) {
            errorResponse = getErrorResponse((ErrorCode) exception);
        } else {
            errorResponse = getErrorResponse(authException);
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }

    private Map<String, Object> getErrorResponse(ErrorCode errorCode) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("code", errorCode.getStatus().value());
        errorResponse.put("status", errorCode.getStatus());
        errorResponse.put("message", errorCode.getMessage());

        return errorResponse;
    }

    private Map<String, Object> getErrorResponse(AuthenticationException authException) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("code", HttpStatus.UNAUTHORIZED.value());
        errorResponse.put("status", HttpStatus.UNAUTHORIZED);
        errorResponse.put("message", authException.getMessage());

        return errorResponse;
    }
}