package com.ssafy.ain.member.service.impl;

import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
}