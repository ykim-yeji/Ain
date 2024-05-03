package com.ssafy.ain.member.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ain.global.util.JwtUtil;
import com.ssafy.ain.global.constant.OAuthProvider;
import com.ssafy.ain.member.dto.AuthDTO.*;
import com.ssafy.ain.member.entity.Member;
import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.OAuthKakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OAuthKakaoServiceImpl implements OAuthKakaoService {

    private final MemberRepository memberRepository;

    /**
     * 회원가입
     * @param oauthId 회원가입할 회원의 소셜 아이디
     * @param oauthProvider 회원가입할 회원의 소셜 로그인 기관
     * @return
     */
    public Member signup(Long oauthId, OAuthProvider oauthProvider) {

        return memberRepository.save(
                    Member.builder()
                        .oauthId(oauthId)
                        .oauthProvider(oauthProvider)
                        .build()
        );
    }
}