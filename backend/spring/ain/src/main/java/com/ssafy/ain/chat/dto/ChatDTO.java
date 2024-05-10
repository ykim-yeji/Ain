package com.ssafy.ain.chat.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class ChatDTO {

    @Getter
    @Setter
    public static class AddIdealPersonChatRequest {
        @NotBlank(message = "채팅 메시지를 입력하지 않았습니다!")
        private String memberChatMessage;
    }

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class AddIdealPersonChatResponse {
        private String idealPersonChatMessageId;
        private String idealPersonChatMessage;
        private String idealPersonChatTime;
    }
}