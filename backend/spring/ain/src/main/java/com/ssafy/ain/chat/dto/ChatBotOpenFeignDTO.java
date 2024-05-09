package com.ssafy.ain.chat.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

public class ChatBotOpenFeignDTO {

    @Getter
    @Setter
    @ToString
    public static class AddIdealPersonChatBotResponse {
        private String idealPersonThreadId;
    }
}