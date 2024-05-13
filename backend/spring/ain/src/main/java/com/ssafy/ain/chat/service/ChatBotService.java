package com.ssafy.ain.chat.service;

import com.ssafy.ain.chat.dto.ChatBotOpenFeignDTO.*;

public interface ChatBotService {

    AddIdealPersonChatBotResponse addIdealPersonChatBot();
    void deleteIdealPersonChatBot(String idealPersonThreadId);
}