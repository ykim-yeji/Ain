package com.ssafy.ain.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ain.global.constant.ErrorCode;
import com.ssafy.ain.member.service.AuthService;
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
    private final AuthService authService;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        Object exception = request.getAttribute("exception");
        Map<String, Object> errorResponse = null;
        if (exception instanceof ErrorCode) {
            errorResponse = authService.getErrorResponse((ErrorCode) exception);
        } else {
            errorResponse = authService.getErrorResponse(authException);
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}