package com.ssafy.ain.idealperson.entity;

import com.ssafy.ain.global.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "ideal_person")
public class IdealPerson extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}