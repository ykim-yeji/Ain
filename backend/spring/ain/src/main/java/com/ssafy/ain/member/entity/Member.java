package com.ssafy.ain.member.entity;

import com.ssafy.ain.global.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "member")
public class Member extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}