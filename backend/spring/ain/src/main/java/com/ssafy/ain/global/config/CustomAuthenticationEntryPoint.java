package com.ssafy.ain.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
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

//인증을 처리하는 과정에서 발생하는 예외를 처리해주는 핸들러다.
@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(getErrorResponse(response, authException)));
    }

    private Map<String, Object> getErrorResponse(HttpServletResponse response, AuthenticationException authException) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("code", HttpStatus.UNAUTHORIZED.value());
        errorResponse.put("status", HttpStatus.UNAUTHORIZED);
        errorResponse.put("message", authException.getMessage());

        return errorResponse;
    }
}