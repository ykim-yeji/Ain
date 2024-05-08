package com.ssafy.ain.idealperson.service.impl;

import com.ssafy.ain.idealperson.dto.IdealPersonDTO.GetIdealPersonResponse;
import com.ssafy.ain.idealperson.dto.IdealPersonDTO.GetIdealPeopleResponse;
import com.ssafy.ain.idealperson.entity.IdealPerson;
import com.ssafy.ain.idealperson.repository.IdealPersonRepository;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IdealPersonServiceImpl implements IdealPersonService {

    private final IdealPersonRepository idealPersonRepository;

    @Override
    public GetIdealPeopleResponse getIdealPeopleList(String memberId) {
        // 예외처리필요
        List<IdealPerson> idealPeople = idealPersonRepository.findIdealPeopleByMemberId(Long.parseLong(memberId));
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
}