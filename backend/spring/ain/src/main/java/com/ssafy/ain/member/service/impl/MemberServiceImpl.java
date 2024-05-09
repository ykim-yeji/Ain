package com.ssafy.ain.member.service.impl;

import com.ssafy.ain.global.constant.LoginProvider;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.member.dto.MemberDTO.*;
import com.ssafy.ain.member.entity.Member;
import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.ain.global.constant.ErrorCode.NOT_EXISTS_MEMBER_ID;

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

    /**
     * 회원 정보 입력
     * @param memberId 회원 정보 입력할 회원의 DB id
     * @param addMemberInfoRequest 입력할 회원 정보
     */
    @Override
    @Transactional
    public void addMemberInfo(Long memberId, AddMemberInfoRequest addMemberInfoRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        member.updateNickname(addMemberInfoRequest.getMemberNickname());
    }

    /**
     * 회원 정보 조회
     * @param memberId 회원 정보 조회할 회원의 DB id
     * @return
     */
    @Override
    public GetMemberInfoResponse getMemberInfo(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));

        return GetMemberInfoResponse.builder()
                .memberNickname(member.getNickname())
                .build();
    }
}