package com.ssafy.ain.idealperson.entity;

import com.ssafy.ain.global.entity.BaseEntity;
import jakarta.persistence.*;

@Entity
@Table(name = "last_name")
public class LastName extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 20)
    private String name;
}