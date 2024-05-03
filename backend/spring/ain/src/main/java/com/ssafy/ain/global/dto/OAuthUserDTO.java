package com.ssafy.ain.global.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
public class OAuthUserDTO {

    private String memberRole;
    private String name;
    private Long memberId;
}