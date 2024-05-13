package com.ssafy.ain.idealperson.service;

import com.ssafy.ain.idealperson.dto.IdealPersonDTO.*;

public interface IdealPersonService {
    GetIdealPeopleResponse getAllIdealPerson(Long memberId);

    void modifyRankingOfIdealPeople(Long memberId, ModifyRankingOfIdealPeopleRequest modifyRankingOfIdealPeopleRequest);

    GetNameOfIdealPersonResponse getNameOfIdealPerson(GetNameOfIdealPersonRequest getNameOfIdealPersonRequest);

    void addIdealPerson(Long memberId, AddIdealPersonRequest addIdealPersonRequest);

    void removeIdealPerson(Long memberId, Long idealPersonId);

    void modifyIdealPersonNickname(Long memberId, Long idealPersonId, String idealPersonNickname);
}