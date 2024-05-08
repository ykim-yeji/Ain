package com.ssafy.ain.idealperson.repository;

import com.ssafy.ain.idealperson.entity.LastName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LastNameRepository extends JpaRepository<LastName, Long> {

    @Query(value = "select * from last_name order by RAND() limit 1", nativeQuery = true)
    LastName findRandomLastName();
}