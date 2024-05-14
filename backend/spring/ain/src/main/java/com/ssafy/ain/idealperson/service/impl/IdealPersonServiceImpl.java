package com.ssafy.ain.idealperson.service.impl;

import com.ssafy.ain.chat.service.ChatBotService;
import com.ssafy.ain.global.exception.InvalidException;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.global.util.S3Service;
import com.ssafy.ain.idealperson.dto.IdealPersonDTO.*;
import com.ssafy.ain.idealperson.entity.IdealPerson;
import com.ssafy.ain.idealperson.repository.FirstNameRepository;
import com.ssafy.ain.idealperson.repository.IdealPersonRepository;
import com.ssafy.ain.idealperson.repository.LastNameRepository;
import com.ssafy.ain.idealperson.service.IdealPersonService;
import com.ssafy.ain.idealperson.util.IdealPersonUtilService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.ssafy.ain.global.constant.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class IdealPersonServiceImpl implements IdealPersonService {

    private final IdealPersonRepository idealPersonRepository;
    private final FirstNameRepository firstNameRepository;
    private final LastNameRepository lastNameRepository;
    private final S3Service s3Service;
    private final ChatBotService chatBotService;
    private final IdealPersonUtilService idealPersonUtilService;

    @Value("${openai.chatgpt.ideal-person.assistant-id}")
    private String idealPersonAssistantId;

    @Override
    @Transactional
    public GetIdealPeopleResponse getAllIdealPerson(Long memberId) {
        List<IdealPerson> idealPeople = idealPersonRepository.findIdealPeopleByMemberIdOrderByRanking(memberId);
        List<GetIdealPersonResponse> idealPeopleResponse = new ArrayList<>();

        for (IdealPerson idealPerson : idealPeople)
            idealPeopleResponse.add(idealPerson.toGetIdealPersonResponse());

        return GetIdealPeopleResponse.builder()
                .idealPeople(idealPeopleResponse)
                .build();
    }

    @Override
    @Transactional
    public void modifyRankingOfIdealPeople(Long memberId, Long[] idealPersonRankings) {
        int len = idealPersonRankings.length;
        Long[] copyOfIdealPersonRankings = new Long[len];
        System.arraycopy(idealPersonRankings, 0, copyOfIdealPersonRankings, 0, len);
        Arrays.sort(copyOfIdealPersonRankings);

        for (int i = 0; i < len - 1; i++) {
            if (copyOfIdealPersonRankings[i].equals(copyOfIdealPersonRankings[i + 1])) {
                throw new InvalidException(INVALID_IDEAL_PERSON_RANKINGS_DUPLICATION);
            }
        }

        for (int i = 0; i < len; i++) {
            IdealPerson idealPerson = idealPersonRepository.findById(idealPersonRankings[i])
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
    public void addIdealPerson(Long memberId, AddIdealPersonRequest addIdealPersonRequest) {
        // s3 호출 && url 받기  --> url
        String idealPersonImageUrl = s3Service.upload(addIdealPersonRequest.getIdealPersonImage());

        // /fast/chatbots/ideal-people 호출 후 threadId 받기 --> threadId
        String idealPersonThreadId = chatBotService.addIdealPersonChatBot().getIdealPersonThreadId();

        // 해당 memberId에 있는 이상형들 랭크+1
        List<IdealPerson> idealPeople = idealPersonRepository.findIdealPeopleByMemberIdOrderByRanking(memberId);
        for (IdealPerson idealPerson : idealPeople)
            idealPerson.updateRanking(idealPerson.getRanking() + 1);

        idealPersonRepository.save(addIdealPersonRequest
                .toEntity(memberId, idealPersonImageUrl, idealPersonAssistantId, idealPersonThreadId));
    }

    @Override
    @Transactional
    public void removeIdealPerson(Long memberId, Long idealPersonId) {
        // memberId, idealPersonId 존재 여부 검사 필요
        List<IdealPerson> idealPeople = idealPersonRepository.findIdealPeopleByMemberIdOrderByRanking(memberId);

        boolean rankDownChecker = false;
        for (IdealPerson idealPerson : idealPeople) {
            if (idealPerson.getId().equals(idealPersonId)) {
                s3Service.delete(idealPerson.getIdealPersonImageUrl());
                idealPersonRepository.deleteById(idealPersonId);
                rankDownChecker = true;
                continue;
            }

            if (rankDownChecker)
                idealPerson.updateRanking(idealPerson.getRanking() - 1);
        }

    }

    @Transactional
    @Override
    public void modifyIdealPersonNickname(Long memberId, Long idealPersonId, String idealPersonNickname) {
        IdealPerson idealPerson = idealPersonRepository.findIdealPersonByIdAndMemberId(idealPersonId, memberId)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_IDEAL_PERSON));

        idealPersonUtilService.validateNicknameNotInput(idealPersonNickname);
        idealPersonUtilService.validateSameNickname(idealPerson.getNickname(), idealPersonNickname);

        idealPerson.modifyIdealPersonNickname(idealPersonNickname);
    }

    @Override
    public GetIdealPersonCountResponse getIdealPersonCount(Long memberId) {;
        return GetIdealPersonCountResponse.builder()
                .idealPersonCount(idealPersonRepository.findIdealPeopleByMemberIdOrderByRanking(memberId)
                        .size())
                .build();
    }
}