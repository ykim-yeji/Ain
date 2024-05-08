package com.ssafy.ain.global.dto;

import com.ssafy.ain.global.constant.LoginProvider;

public interface OAuth2Response {

    Long getOAuthId();
    LoginProvider getOAuthProvider();
}