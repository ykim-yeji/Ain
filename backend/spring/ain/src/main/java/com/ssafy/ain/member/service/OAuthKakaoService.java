package com.ssafy.ain.member.service;

import com.ssafy.ain.global.constant.OAuthProvider;
import com.ssafy.ain.member.dto.AuthDTO.*;
import com.ssafy.ain.member.entity.Member;

public interface OAuthKakaoService {

    Member signup(Long oauthId, OAuthProvider oauthProvider);
}