package com.ssafy.ain.idealperson.entity;

import com.ssafy.ain.global.entity.BaseEntity;
import com.ssafy.ain.global.constant.Gender;
import com.ssafy.ain.idealperson.constant.Mbti;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicUpdate
@Table(name = "ideal_person")
public class IdealPerson extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "full_name", length = 20)
    private String fullName;

    @Column(name = "nickname", length = 100)
    private String nickname;

    @Column(name = "mbti", nullable = false)
    @Enumerated(EnumType.STRING)
    private Mbti mbti;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "ideal_person_image_url", nullable = false, columnDefinition = "TEXT")
    private String idealPersonImageUrl;

    @Column(name = "assistant_id", nullable = false, length = 100)
    private String assistantId;

    @Column(name = "thread_id", nullable = false, length = 100)
    private String threadId;

    @Column(name = "ranking", nullable = false)
    private int ranking;

    public void updateRanking(int ranking) { this.ranking = ranking; }
}