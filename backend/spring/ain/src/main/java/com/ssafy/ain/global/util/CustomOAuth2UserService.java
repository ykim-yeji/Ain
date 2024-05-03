package com.ssafy.ain.global.util;

import com.ssafy.ain.global.constant.MemberRole;
import com.ssafy.ain.global.constant.OAuthProvider;
import com.ssafy.ain.global.dto.CustomOAuth2User;
import com.ssafy.ain.global.dto.OAuth2Response;
import com.ssafy.ain.global.dto.OAuthUserDTO;
import com.ssafy.ain.global.dto.impl.KakaoResponse;
import com.ssafy.ain.member.entity.Member;
import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.OAuthKakaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final OAuthKakaoService oauthKakaoService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals(OAuthProvider.KAKAO.getEnName())) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else {

            return null;
        }

        Member member = memberRepository.findByOauthIdAndOauthProvider(oAuth2Response.getOAuthId(), oAuth2Response.getOAuthProvider());
        if (member == null) {
            member = oauthKakaoService.signup(oAuth2Response.getOAuthId(), oAuth2Response.getOAuthProvider());
        }

        return new CustomOAuth2User(
                OAuthUserDTO.builder()
                        .memberId(member.getId())
                        .name("사용자")
                        .memberRole(MemberRole.USER.toString())
                        .build()
        );
    }
}