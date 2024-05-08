package com.ssafy.ain.idealperson.service.impl;

import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.idealperson.dto.IdealPersonDTO.*;
import com.ssafy.ain.idealperson.entity.FirstName;
import com.ssafy.ain.idealperson.entity.IdealPerson;
import com.ssafy.ain.idealperson.entity.LastName;
import com.ssafy.ain.idealperson.repository.FirstNameRepository;
import com.ssafy.ain.idealperson.repository.IdealPersonRepository;
import com.ssafy.ain.idealperson.repository.LastNameRepository;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.ain.global.constant.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class IdealPersonServiceImpl implements IdealPersonService {

    private final IdealPersonRepository idealPersonRepository;
    private final FirstNameRepository firstNameRepository;
    private final LastNameRepository lastNameRepository;

    @Override
    public GetIdealPeopleResponse getAllIdealPerson(String memberId) {
        // 예외처리필요
        List<IdealPerson> idealPeople = idealPersonRepository.findIdealPeopleByMemberId(Long.parseLong(memberId),
                Sort.by(Sort.Direction.ASC, "ranking"));
        List<GetIdealPersonResponse> idealPeopleResponse = new ArrayList<>();

        for (IdealPerson idealPerson : idealPeople) {
            idealPeopleResponse.add(GetIdealPersonResponse.builder()
                            .idealPersonId(idealPerson.getId())
                            .idealPersonFullName(idealPerson.getFullName())
                            .idealPersonNickname(idealPerson.getNickname())
                            .idealPersonImageUrl(idealPerson.getIdealPersonImageUrl())
                            .idealPersonRank(idealPerson.getRanking())
                            .idealPersonThreadId(idealPerson.getThreadId())
                            .build());
        }

        return GetIdealPeopleResponse.builder()
                .idealPeople(idealPeopleResponse)
                .build();
    }

    @Override
    public void modifyRankingOfIdealPeople(ModifyRankingOfIdealPeopleRequest modifyRankingOfIdealPeopleRequest) {
        for (int i = 0; i < modifyRankingOfIdealPeopleRequest.getIdealPersonRankings().length; i++) {
            IdealPerson idealPerson =
                    idealPersonRepository.findById(modifyRankingOfIdealPeopleRequest.getIdealPersonRankings()[i])
                            .orElseThrow(() -> new NoExistException(NOT_EXISTS_IDEAL_PERSON));
            idealPerson.updateRanking(i);
        }
    }

    @Override
    public GetNameOfIdealPersonResponse getNameOfIdealPerson(GetNameOfIdealPersonRequest getNameOfIdealPersonRequest) {
        String lastName = lastNameRepository.findRandomLastName().getName();
        String firstName = firstNameRepository
                .findRandomFirstName(getNameOfIdealPersonRequest.getIdealPersonGender())
                .getName();

        return GetNameOfIdealPersonResponse.builder()
                .idealPersonName(lastName + firstName)
                .build();
    }
}