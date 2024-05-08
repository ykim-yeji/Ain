package com.ssafy.ain.idealperson.repository;

import com.ssafy.ain.global.constant.Gender;
import com.ssafy.ain.idealperson.entity.FirstName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FirstNameRepository extends JpaRepository<FirstName, Long> {
    @Query(value = "select * from first_name f where (f.gender = :gender) order by RAND() limit 1", nativeQuery = true)
    FirstName findRandomFirstName(@Param("gender") Gender gender);
}