package com.ssafy.ain.idealperson.repository;

import com.ssafy.ain.idealperson.entity.IdealPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IdealPersonRepository extends JpaRepository<IdealPerson, Long> {
    List<IdealPerson> findIdealPeopleByMemberId(Long memberId);
}