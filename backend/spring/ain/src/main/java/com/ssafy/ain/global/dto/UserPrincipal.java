package com.ssafy.ain.global.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Getter
public class UserPrincipal implements OAuth2User {

    private final UserInfoDTO userInfoDTO;
    private final Collection<? extends GrantedAuthority> authorities;
    private final Map<String, Object> attributes;
    private final String name;
    private final OAuthUserDTO oAuthUserDTO;

    @Builder
    public UserPrincipal(UserInfoDTO userInfoDTO, OAuthUserDTO oAuthUserDTO) {
        this.userInfoDTO = userInfoDTO;
        this.authorities = addAuthorities("USER");
        this.name = String.valueOf(userInfoDTO.getMemberLoginId()) + userInfoDTO.getLoginProvider();
        this.attributes = null;
        this.oAuthUserDTO = oAuthUserDTO;
    }

    private Collection<? extends GrantedAuthority> addAuthorities(String memberRole) {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add((GrantedAuthority) () -> memberRole);

        return collection;
    }
}