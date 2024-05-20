package com.ssafy.ain.global.util;

import com.ssafy.ain.global.constant.LoginProvider;
import com.ssafy.ain.global.dto.UserInfoDTO;
import com.ssafy.ain.global.dto.OAuth2Response;
import com.ssafy.ain.global.dto.OAuthUserDTO;
import com.ssafy.ain.global.dto.UserPrincipal;
import com.ssafy.ain.global.dto.impl.KakaoResponse;
import com.ssafy.ain.member.constant.MemberStatus;
import com.ssafy.ain.member.entity.Member;
import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.MemberService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import static com.ssafy.ain.global.constant.ErrorCode.INVALID_OAUTH_PROVIDER;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals(LoginProvider.KAKAO.getEnName())) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else {
            throw new OAuth2AuthenticationException(INVALID_OAUTH_PROVIDER.getMessage());
        }

        Member member = memberRepository.findByMemberLoginIdAndLoginProvider(oAuth2Response.getOAuthId(), oAuth2Response.getOAuthProvider());
        boolean isNewmember = false;
        if (member == null) {
            member = memberService.signup(oAuth2Response.getOAuthId(), oAuth2Response.getOAuthProvider());
            isNewmember = true;
        }
        if (member.getStatus() == MemberStatus.DELETE) {
            member.updateStatus(MemberStatus.LOGIN);
            isNewmember = true;
        }

        return UserPrincipal.builder()
                .userInfoDTO(
                        UserInfoDTO.builder()
                                .memberId(member.getId())
                                .memberLoginId(member.getMemberLoginId())
                                .loginProvider(member.getLoginProvider())
                                .build()
                )
                .oAuthUserDTO(
                        OAuthUserDTO.builder()
                                .isNewMember(isNewmember)
                                .build()
                )
                .build();
    }
}