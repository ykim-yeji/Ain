package com.ssafy.ain.member.repository;

import com.ssafy.ain.global.constant.OAuthProvider;
import com.ssafy.ain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByOauthIdAndOauthProvider(Long oauthId, OAuthProvider oauthProvider);
}