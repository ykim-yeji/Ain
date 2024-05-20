package com.ssafy.ain.member.entity;

import com.ssafy.ain.global.entity.BaseEntity;
import com.ssafy.ain.member.constant.MemberStatus;
import com.ssafy.ain.global.constant.LoginProvider;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "member")
public class Member extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "oauth_id", nullable = false)
    private Long memberLoginId;

    @Column(name = "oauth_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private LoginProvider loginProvider;

    @Column(name = "nickname", length = 20)
    @ColumnDefault("'사용자'")
    private String nickname;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateStatus(MemberStatus status) {
        this.status = status;
    }
}