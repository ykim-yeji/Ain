package com.ssafy.ain.chat.dto;

import com.ssafy.ain.chat.dto.ChatDTO.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

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

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetIdealPersonChatsOFResponse {
        private List<GetIdealPersonChatResponse> chats;
        private boolean isLastChats;
    }
}