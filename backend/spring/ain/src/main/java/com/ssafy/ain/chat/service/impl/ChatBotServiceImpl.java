package com.ssafy.ain.chat.service.impl;

import com.ssafy.ain.chat.dto.ChatBotOpenFeignDTO.*;
import com.ssafy.ain.chat.openfeign.ChatBotOpenFeign;
import com.ssafy.ain.chat.service.ChatBotService;
import com.ssafy.ain.global.dto.OpenFeignResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatBotServiceImpl implements ChatBotService {

    private final ChatBotOpenFeign chatBotOpenFeign;

    /**
     * 이상형 챗봇 생성
     * @return 생성될 이상형 챗봇의 thread id
     */
    public AddIdealPersonChatBotResponse addIdealPersonChatBot() {
        OpenFeignResponse<AddIdealPersonChatBotResponse> chatBotDTO = chatBotOpenFeign.addIdealPersonChatBot();
        log.info("code: " + chatBotDTO.getCode());
        log.info("status: " + chatBotDTO.getStatus());
        log.info("message: " + chatBotDTO.getMessage());
        log.info("data: " + chatBotDTO.getData().toString());

        return chatBotDTO.getData();
    }

    /**
     * 이상형 챗봇 삭제
     * @param idealPersonThreadId 삭제될 이상형 챗봇의 thread id
     */
    @Override
    public void deleteIdealPersonChatBot(String idealPersonThreadId) {
        OpenFeignResponse<?> chatBotDTO = chatBotOpenFeign.deletePersonChatBot(
                DeleteIdealPersonChatBotRequest.builder()
                        .idealPersonThreadId(idealPersonThreadId)
                        .build()
        );
        log.info("code: " + chatBotDTO.getCode());
        log.info("status: " + chatBotDTO.getStatus());
        log.info("message: " + chatBotDTO.getMessage());
    }
}