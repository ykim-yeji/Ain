package com.ssafy.ain.idealperson.service;

import com.ssafy.ain.idealperson.dto.IdealPersonDTO.GetIdealPeopleResponse;

public interface IdealPersonService {
    GetIdealPeopleResponse getAllIdealPerson(String memberId);
}