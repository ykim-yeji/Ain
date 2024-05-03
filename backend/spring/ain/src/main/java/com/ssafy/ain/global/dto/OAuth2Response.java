package com.ssafy.ain.global.dto;

import com.ssafy.ain.global.constant.OAuthProvider;

public interface OAuth2Response {

    Long getOAuthId();
    OAuthProvider getOAuthProvider();
}