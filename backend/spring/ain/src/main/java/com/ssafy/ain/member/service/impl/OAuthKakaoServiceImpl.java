package com.ssafy.ain.member.service.impl;

import com.ssafy.ain.global.constant.OAuthProvider;
import com.ssafy.ain.member.entity.Member;
import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.OAuthKakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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