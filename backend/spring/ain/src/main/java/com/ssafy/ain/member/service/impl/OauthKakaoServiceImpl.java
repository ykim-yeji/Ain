//package com.ssafy.ain.member.service.impl;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ssafy.ain.member.constant.OauthProvider;
//import com.ssafy.ain.member.dto.AuthDTO.*;
//import com.ssafy.ain.member.entity.Member;
//import com.ssafy.ain.member.repository.MemberRepository;
//import com.ssafy.ain.member.service.OauthKakaoService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//@RequiredArgsConstructor
//public class OauthKakaoServiceImpl implements OauthKakaoService {
//
//    private final MemberRepository memberRepository;
//
//    @Value("${oauth.kakao.authorization-grant-type}")
//    private String authorizationGrantType;
//    @Value("${oauth.kakao.client-id}")
//    private String clientId;
//    @Value("${oauth.kakao.redirect-uri}")
//    private String redirectUri;
//
//    /**
//     * 카카오 소셜 로그인
//     * @param authorizationCode 인가 코드
//     * @return
//     */
//    @Override
//    public LoginResponse login(String authorizationCode) {
//        //인가 코드로 액세스 토큰 받기
//        String accessToken = getAccessToken(authorizationCode);
//        //액세스 토큰으로 사용자 정보 가져오기
//        Long oauthId = getKakaoUser(accessToken);
//        //새로운 사용자일 경우 회원가입
//        Member member = memberRepository.findByOauthIdAndOauthProvider(oauthId, OauthProvider.KAKAO);
//        if (member == null) {
//            member = signup(oauthId, OauthProvider.KAKAO);
//        }
//
//        return LoginResponse.builder()
//                .memberId(member.getId())
//                .memberAccessToken(null)
//                .memberRefreshToken(null)
//                .build();
//    }
//
//    /**
//     * 인가 코드로 액세스 토큰 받기
//     * @param authorizationCode 인가 코드
//     * @return
//     */
//    private String getAccessToken(String authorizationCode) {
//        //HTTP Header 생성
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//        //HTTP Body 생성
//        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
//        body.add("grant_type", authorizationGrantType);
//        body.add("client_id", clientId);
//        body.add("redirect_id", redirectUri);
//        body.add("code", authorizationCode);
//        //HTTP 요청 보내기 및 응답 받기
//        HttpEntity<MultiValueMap<String, String>> accessTokenRequest = new HttpEntity<>(body, headers);
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> accessTokenResponse = restTemplate.exchange("https://kauth.kakao.com/oauth/token",
//                HttpMethod.POST, accessTokenRequest, String.class);
//        //JSON 형태의 HTTP 응답 파싱
//        String accessTokenResponseBody = accessTokenResponse.getBody();
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            JsonNode jsonNode = objectMapper.readTree(accessTokenResponseBody);
//
//            return jsonNode.get("access_token").asText();
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 액세스 토큰으로 사용자 정보 가져오기
//     * @param accessToken 액세스 토큰
//     * @return
//     */
//    private Long getKakaoUser(String accessToken) {
//        //HTTP Header 생성
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + accessToken);
//        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
//        //HTTP 요청 보내기 및 응답 받기
//        HttpEntity<MultiValueMap<String, String>> kakaoUserRequest = new HttpEntity<>(headers);
//        RestTemplate restTemplate = new RestTemplate();
//        ResponseEntity<String> kakaoUserResponse = restTemplate.exchange("https://kapi.kakao.com/v2/user/me",
//                HttpMethod.POST, kakaoUserRequest, String.class);
//        //JSON 형태의 HTTP 응답 파싱
//        String kakaoUserResponseBody = kakaoUserResponse.getBody();
//        ObjectMapper objectMapper = new ObjectMapper();
//        try {
//            JsonNode jsonNode = objectMapper.readTree(kakaoUserResponseBody);
//
//            return jsonNode.get("id").asLong();
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 회원가입
//     * @param oauthId 회원가입할 회원의 소셜 아이디
//     * @param oauthProvider 회원가입할 회원의 소셜 로그인 기관
//     * @return
//     */
//    private Member signup(Long oauthId, OauthProvider oauthProvider) {
//        memberRepository.save(
//                Member.builder()
//                        .oauthId(oauthId)
//                        .oauthProvider(oauthProvider)
//                        .build()
//        );
//
//        return memberRepository.findByOauthIdAndOauthProvider(oauthId, oauthProvider);
//    }
//}