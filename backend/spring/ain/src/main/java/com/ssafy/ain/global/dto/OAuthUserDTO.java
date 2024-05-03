package com.ssafy.ain.global.dto;

import com.ssafy.ain.global.constant.MemberRole;
import com.ssafy.ain.global.constant.OAuthProvider;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor
public class OAuthUserDTO {

    private String memberRole;
    private String name;
    private Long memberId;
}