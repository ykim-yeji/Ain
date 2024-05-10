package com.ssafy.ain.chat.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @Getter
    @Setter
    public static class GetRecentDialogsRequest {
        private String idealPersonThreadId;
        private String lastChatMessageId;
    }

    @AllArgsConstructor
    @Builder
    public static class GetRecentDialogsResponse {
        List<GetRecentDialogResponse> dialogs;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetRecentDialogResponse {
        private String chatMessageId;
        private String chatMessage;
        private String chatSender;
        private String chatTime;
    }
}