package com.ssafy.ain.member.service.impl;

import com.ssafy.ain.global.constant.LoginProvider;
import com.ssafy.ain.member.entity.Member;
import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    /**
     * 회원가입
     * @param memberLoginId 회원가입할 회원의 로그인 아이디
     * @param loginProvider 회원가입할 회원의 로그인 기관
     * @return
     */
    public Member signup(Long memberLoginId, LoginProvider loginProvider) {

        return memberRepository.save(
                Member.builder()
                        .memberLoginId(memberLoginId)
                        .loginProvider(loginProvider)
                        .build()
        );
    }
}