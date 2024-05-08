package com.ssafy.ain.idealperson.service;

import com.ssafy.ain.idealperson.dto.IdealPersonDTO.*;

public interface IdealPersonService {
    GetIdealPeopleResponse getAllIdealPerson(String memberId);

    void modifyRankingOfIdealPeople(ModifyRankingOfIdealPeopleRequest modifyRankingOfIdealPeopleRequest);

    GetNameOfIdealPersonResponse getNameOfIdealPerson(GetNameOfIdealPersonRequest getNameOfIdealPersonRequest);
}