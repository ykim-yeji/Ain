package com.ssafy.ain.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ain.global.constant.ErrorCode;
import com.ssafy.ain.member.service.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;
    private final AuthService authService;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {
        Object exception = request.getAttribute("exception");
        Map<String, Object> errorResponse = null;
        if (exception instanceof ErrorCode) {
            errorResponse = authService.getErrorResponse((ErrorCode) exception);
        } else {
            errorResponse = authService.getErrorResponse(accessDeniedException);
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}