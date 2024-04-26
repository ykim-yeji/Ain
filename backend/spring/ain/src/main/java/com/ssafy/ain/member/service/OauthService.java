package com.ssafy.ain.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ain.member.dto.AuthDTO.*;

public interface OauthService {

    LoginResponse login(String authorizationCode);
}