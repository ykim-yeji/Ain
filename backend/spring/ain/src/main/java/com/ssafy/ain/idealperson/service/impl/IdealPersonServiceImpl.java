package com.ssafy.ain.idealperson.service.impl;

import com.ssafy.ain.global.constant.Gender;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.global.util.S3Service;
import com.ssafy.ain.idealperson.constant.Mbti;
import com.ssafy.ain.idealperson.dto.IdealPersonDTO.*;
import com.ssafy.ain.idealperson.entity.FirstName;
import com.ssafy.ain.idealperson.entity.IdealPerson;
import com.ssafy.ain.idealperson.entity.LastName;
import com.ssafy.ain.idealperson.repository.FirstNameRepository;
import com.ssafy.ain.idealperson.repository.IdealPersonRepository;
import com.ssafy.ain.idealperson.repository.LastNameRepository;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import jakarta.transaction.Transactional;
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
    private final S3Service s3Service;

    @Override
    @Transactional
    public GetIdealPeopleResponse getAllIdealPerson(Long memberId) {
        List<IdealPerson> idealPeople = idealPersonRepository.findIdealPeopleByMemberId(memberId,
                Sort.by(Sort.Direction.ASC, "ranking"));
        List<GetIdealPersonResponse> idealPeopleResponse = new ArrayList<>();

        for (IdealPerson idealPerson : idealPeople)
            idealPeopleResponse.add(idealPerson.toGetIdealPersonResponse());

        return GetIdealPeopleResponse.builder()
                .idealPeople(idealPeopleResponse)
                .build();
    }

    @Override
    @Transactional
    public void modifyRankingOfIdealPeople(Long memberId, ModifyRankingOfIdealPeopleRequest modifyRankingOfIdealPeopleRequest) {
        for (int i = 0; i < modifyRankingOfIdealPeopleRequest.getIdealPersonRankings().length; i++) {
            IdealPerson idealPerson =
                    idealPersonRepository.findById(modifyRankingOfIdealPeopleRequest.getIdealPersonRankings()[i])
                            .orElseThrow(() -> new NoExistException(NOT_EXISTS_IDEAL_PERSON));
            idealPerson.updateRanking(i);
        }
    }

    @Override
    @Transactional
    public GetNameOfIdealPersonResponse getNameOfIdealPerson(GetNameOfIdealPersonRequest getNameOfIdealPersonRequest) {
        String lastName = lastNameRepository.findRandomLastName().getName();

        String firstName = firstNameRepository
                .findRandomFirstName(getNameOfIdealPersonRequest.getIdealPersonGender()).getName();

        return GetNameOfIdealPersonResponse.builder()
                .idealPersonName(lastName + firstName)
                .build();
    }

    @Override
    @Transactional
    public void addIdealPerson(Long memberId, String threadId, AddIdealPersonRequest addIdealPersonRequest) {
        // s3 호출 && url 받기  --> url
        String idealPersonImageUrl = s3Service.upload(addIdealPersonRequest.getIdealPersonImage());
        // /fast/chatbots/ideal-people 호출 후 threadId 받기 --> threadId

        // 해당 memberId에 있는 이상형들 랭크+1 (10 넘어가면 에러)
        List<IdealPerson> idealPeople = idealPersonRepository.findIdealPeopleByMemberId(memberId,
                Sort.by(Sort.Direction.ASC, "ranking"));
        for (IdealPerson idealPerson : idealPeople)
            idealPerson.updateRanking(idealPerson.getRanking() + 1);

        idealPersonRepository.save(addIdealPersonRequest.toEntity(memberId, idealPersonImageUrl, threadId));
    }
}