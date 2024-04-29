package com.ssafy.ain.member.service;

import com.ssafy.ain.member.dto.AuthDTO.*;

public interface OauthKakaoService {

    LoginResponse login(String authorizationCode);
}