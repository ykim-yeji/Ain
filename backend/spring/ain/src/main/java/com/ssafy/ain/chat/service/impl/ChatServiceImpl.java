package com.ssafy.ain.chat.service.impl;

import com.ssafy.ain.chat.dto.ChatBotOpenFeignDTO.*;
import com.ssafy.ain.chat.dto.ChatDTO.*;
import com.ssafy.ain.chat.dto.ChatOpenFeignDTO.*;
import com.ssafy.ain.chat.openfeign.ChatBotOpenFeign;
import com.ssafy.ain.chat.openfeign.ChatOpenFeign;
import com.ssafy.ain.chat.service.ChatBotService;
import com.ssafy.ain.chat.service.ChatService;
import com.ssafy.ain.global.dto.OpenFeignResponse;
import com.ssafy.ain.global.exception.NoExistException;
import com.ssafy.ain.idealperson.entity.IdealPerson;
import com.ssafy.ain.idealperson.repository.IdealPersonRepository;
import com.ssafy.ain.member.entity.Member;
import com.ssafy.ain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.ssafy.ain.global.constant.ErrorCode.NOT_EXISTS_IDEAL_PERSON_ID;
import static com.ssafy.ain.global.constant.ErrorCode.NOT_EXISTS_MEMBER_ID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final ChatOpenFeign chatOpenFeign;
    private final ChatBotOpenFeign chatBotOpenFeign;
    private final IdealPersonRepository idealPersonRepository;
    private final MemberRepository memberRepository;
    private final ChatBotService chatBotService;

    /**
     * 이상형과의 채팅 전송
     * @param memberId 회원 id
     * @param idealPersonId 이상형 id
     * @param addIdealPersonChatRequest 회원이 보낸 채팅 메시지
     * @return
     */
    @Override
    public AddIdealPersonChatResponse addIdealPersonChat(Long memberId, Long idealPersonId, AddIdealPersonChatRequest addIdealPersonChatRequest) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_MEMBER_ID));
        IdealPerson idealPerson = idealPersonRepository.findById(idealPersonId)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_IDEAL_PERSON_ID));
        AddIdealPersonChatOFRequest addIdealPersonChatOFRequest = AddIdealPersonChatOFRequest.builder()
                .idealPersonAssistantId(idealPerson.getAssistantId())
                .idealPersonThreadId(idealPerson.getThreadId())
                .idealPersonFullName(idealPerson.getFullName())
                .idealPersonNickname(idealPerson.getNickname())
                .idealPersonGender(idealPerson.getGender().getName())
                .idealPersonMbti(idealPerson.getMbti().toString())
                .memberNickname(member.getNickname())
                .memberChatMessage(addIdealPersonChatRequest.getMemberChatMessage())
                .build();
        OpenFeignResponse<AddIdealPersonChatOFResponse> chatDTO = chatOpenFeign.addIdealPersonChat(addIdealPersonChatOFRequest);
        log.info("code: " + chatDTO.getCode());
        log.info("status: " + chatDTO.getStatus());
        log.info("message: " + chatDTO.getMessage());
        log.info("data: " + chatDTO.getData());

        return AddIdealPersonChatResponse.builder()
                .idealPersonChatMessageId(chatDTO.getData().getIdealPersonChatMessageId())
                .idealPersonChatMessage(chatDTO.getData().getIdealPersonChatMessage())
                .idealPersonChatTime(chatDTO.getData().getIdealPersonChatTime())
                .build();
    }

    @Override
    public GetRecentDialogsResponse getRecentDialogs(Long memberId, Long idealPersonId, GetRecentDialogsRequest getRecentDialogsRequest) {
        return null;
    }

    /**
     * 이상형과의 채팅 초기화
     * @param memberId 회원 id
     * @param idealPersonId 채팅 초기화될 이상형 id
     */
    @Override
    @Transactional
    public void deleteIdealPersonChat(Long memberId, Long idealPersonId) {
        IdealPerson idealPerson = idealPersonRepository.findById(idealPersonId)
                .orElseThrow(() -> new NoExistException(NOT_EXISTS_IDEAL_PERSON_ID));
        chatBotService.deleteIdealPersonChatBot(idealPerson.getThreadId());
        AddIdealPersonChatBotResponse addIdealPersonChatBotResponse = chatBotService.addIdealPersonChatBot();
        idealPerson.updateThreadId(addIdealPersonChatBotResponse.getIdealPersonThreadId());
    }
}