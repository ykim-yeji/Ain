package com.ssafy.ain.member.service;

import com.ssafy.ain.global.constant.LoginProvider;
import com.ssafy.ain.member.entity.Member;

public interface MemberService {

    Member signup(Long oauthId, LoginProvider oauthProvider);
}