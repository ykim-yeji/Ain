package com.ssafy.ain.member.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ain.member.dto.AuthDTO.*;
import com.ssafy.ain.member.repository.MemberRepository;
import com.ssafy.ain.member.service.OauthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class OauthKakaoServiceImpl implements OauthService {

    @Value("${oauth.kakao.grant-type}")
    private String authorizationGrantType;
    @Value("${oauth.kakao.client-id}")
    private String clientId;
    @Value("${oauth.kakao.redirect-uri}")
    private String redirectUri;

    /**
     * 카카오 소셜 로그인
     * @param authorizationCode 인가 코드
     * @return
     */
    @Override
    public LoginResponse login(String authorizationCode) {
        //인가 코드로 액세스 토큰 받기
        String accessToken = getAccessToken(authorizationCode);

        return null;
    }

    /**
     * 인가 코드로 액세스 토큰 받기
     * @param authorizationCode 인가 코드
     * @return
     */
    private String getAccessToken(String authorizationCode) {
        //HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
        //HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", authorizationGrantType);
        body.add("client_id", clientId);
        body.add("redirect_id", redirectUri);
        body.add("code", authorizationCode);
        //HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> accessTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = restTemplate.exchange("https://kauth.kakao.com/oauth/token",
                HttpMethod.POST, accessTokenRequest, String.class);
        //JSON 형태의 HTTP 응답 파싱
        String accessTokenResponseBody = accessTokenResponse.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(accessTokenResponseBody);

            return jsonNode.get("access_token").asText();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}