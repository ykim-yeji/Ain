package com.ssafy.ain.member.repository;

import com.ssafy.ain.global.constant.LoginProvider;
import com.ssafy.ain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Member findByMemberLoginIdAndLoginProvider(Long memberLoginId, LoginProvider loginProvider);
}