package com.ssafy.ain.member.controller;

import com.ssafy.ain.global.dto.ApiResponse;
import com.ssafy.ain.global.dto.UserPrincipal;
import com.ssafy.ain.member.service.MemberService;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.ain.global.constant.SuccessCode.UPDATE_MEMBER_INFO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PatchMapping
    public ApiResponse<?> addMemberInfo(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                        @NotBlank(message = "회원 닉네임을 입력하지 않았습니다!")
                                        @Size(min = 1, max = 20, message = "회원 닉네임의 글자 수 제한을 지키지 않았습니다!")
                                        String memberNickname) {
        memberService.addMemberInfo(userPrincipal, memberNickname);

        return ApiResponse.success(UPDATE_MEMBER_INFO);
    }
}