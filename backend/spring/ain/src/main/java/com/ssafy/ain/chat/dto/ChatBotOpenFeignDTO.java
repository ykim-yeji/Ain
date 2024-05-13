package com.ssafy.ain.chat.dto;

import lombok.*;

public class ChatBotOpenFeignDTO {

    @Getter
    @Setter
    @ToString
    public static class AddIdealPersonChatBotResponse {
        private String idealPersonThreadId;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class DeleteIdealPersonChatBotRequest {
        private String idealPersonThreadId;
    }
}