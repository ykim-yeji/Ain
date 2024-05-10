package com.ssafy.ain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ChatOpenFeignDTO {

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class AddIdealPersonChatOFRequest {
        private String idealPersonAssistantId;
        private String idealPersonThreadId;
        private String idealPersonFullName;
        private String idealPersonNickname;
        private String idealPersonGender;
        private String idealPersonMbti;
        private String memberNickname;
        private String memberChatMessage;
    }

    @Getter
    @Setter
    public static class AddIdealPersonChatOFResponse {
        private String idealPersonChatMessageId;
        private String idealPersonChatMessage;
        private String idealPersonChatTime;
    }
}